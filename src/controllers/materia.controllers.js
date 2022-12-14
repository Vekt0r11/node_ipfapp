const Materia = require("../models/materia.models");
const controller = {};

controller.getMaterias = async (_req, res) => {
  const materias = await Materia.find({ isActive: true })
    .populate({
      path: 'jefeCatedra auxiliar cursantes.estudiante',
      select: 'infoPersonal.nombres infoPersonal.nombres isActive infoPersonal.nombres',
      match: { isActive: { $eq: true } }
    })

  // console.log(materias)
  const nuevoFormato = materias.map((element) => {

    const { _id, nombre, jefeCatedra, auxiliar, clases, cuatrimestre, anio, cursantes } = element
    const materia = { _id, nombre, clases, cuatrimestre, anio, cursantes }

    materia.jefeCatedra = {
      nombres: jefeCatedra.infoPersonal.nombres,
      _id
    }
    materia.auxiliar = {
      nombres: auxiliar.infoPersonal.nombres,
      _id
    }

    materia.cursantes = element.cursantes.filter((element) => {

      if (element.estudiante === undefined || element.estudiante === null) {
        return null
      }
      return element
    })

    // console.log(materia.cursantes)
    return materia
  })

  res.json(nuevoFormato)
}

controller.getMateria = async (req, res) => {
  const { id } = req.params

  try {
    const materia = await Materia.findOne({ _id: id })
      .populate({
        path: 'cursantes.estudiante jefeCatedra auxiliar',
        select: 'isActive infoPersonal.nombres infoPersonal.nombres',
        match: { isActive: { $eq: true } }
      })

    const { _id, nombre, jefeCatedra, auxiliar, clases, cuatrimestre, anio, cursantes } = materia
    const materiaFormateada = { _id, nombre, clases, cuatrimestre, anio, cursantes }

    materiaFormateada.jefeCatedra = jefeCatedra.infoPersonal.nombres
    materiaFormateada.auxiliar = auxiliar.infoPersonal.nombres

    materiaFormateada.cursantes = materiaFormateada.cursantes.filter((element) => {

      if (element.estudiante === undefined || element.estudiante === null) {
        return null
      }
      return element
    })

    res.json(materiaFormateada)
  } catch (error) {
    res.json({
      msg: "Error al obtener materia"
    })
  }
}

//Traer tods las materias de un alumno/profesor/auxiliar
controller.getAsignadas = async (req, res) => {

  const { estudiante, jefeCatedra, auxiliar } = req.query
  let query = {}

  if (estudiante) {
    query = { isActive: true, cursantes: { $elemMatch: { estudiante: { $eq: estudiante } } } }
  }
  if (jefeCatedra) {
    query = { isACtive: true, $elemMatch: { jefeCatedra: { $eq: jefeCatedra } } }
  }
  if (auxiliar) {
    query = { isActive: true, $elemMatch: { auxiliar: { $eq: auxiliar } } }
  }

  try {
    const materias = await Materia.find(query)
      .populate({
        path: 'jefeCatedra auxiliar cursantes.estudiante',
        select: 'infoPersonal.nombres infoPersonal.apellidos isActive infoPersonal.nombres infoPersonal.apellidos isActive infoPersonal.nombres infoPersonal.apellidos isActive',
      })

    res.status(200).json(materias)
  } catch (error) {
    res.status(404).json({
      msg: 'No se encontraron materias asignadas al usuario'
    })
  }
}

controller.createMateria = async (req, res) => {

  const datos = { nombre, jefeCatedra, auxiliar, clases, cuatrimestre, anio, isActive, cursantes } = req.body

  const materias = await Materia.find({ isActive: true })
    .populate({
      path: 'jefeCatedra auxiliar cursantes.estudiante',
      select: 'infoPersonal.nombres infoPersonal.apellidos infoPersonal.nombres isActive infoPersonal.nombres',
      match: { isActive: { $eq: true } }
    })
  try {

    const materia = new Materia(datos)
    await materia.save()

    return res.json({
      msg: "Materia creada",
    })
  } catch (error) {
    // return console.log(error)
    return res.status(401).json({
      msg: "Error al crear materia",
    })
  }
}

controller.addCursante = async (req, res) => {

  //ID de la materia
  const { id } = req.params

  try {
    const newCursante = { estudiante, asistencia, primerParcial, segundoParcial, final } = req.body
    const materia = await Materia.updateOne({ _id: id }, { $push: { cursantes: newCursante } })


    return res.status(200).json({
      msg: 'El alumno se agreg?? correctamente'
    })
  } catch (error) {
    return res.status(401).json({
      msg: 'Error al agregar alumno a la materia'
    })
  }

}

controller.updateInfoCursante = async (req, res) => {
  //Pasar id de materia
  const { idmateria, idcursante } = req.query

  console.log(idmateria, idcursante)
  try {
    // const materia = await Materia.findOne({ cursantes: { $elemMatch: { _id: { $eq: id } } } })
    const materia = await Materia.findOne({_id:idmateria, cursantes: { $elemMatch: { _id: { $eq: idcursante } } }})
    const { cursantes } = materia

    cursantes.filter((estudiante, key) => {
      const { _id } = estudiante

      if (idcursante == _id.toString()) {
        const { estudiante, asistencia, primerParcial, segundoParcial, final, isActive } = req.body
        materia.cursantes[key] = { estudiante, asistencia, primerParcial, segundoParcial, final, isActive }
        materia.save()
      } else {
        return res.status(403).json({
          msg: 'Error al encontrar usuario'
        })
      }
    })
    return res.status(200).json({
      msg: 'La informacion del estudiante se actualiz?? correctamente'
    })
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al actualizar la informacion del estudiante',
      error 
    })
  }
}

controller.updateMateria = async (req, res) => {
  const { id } = req.params

  const { nombre, jefeCatedra, auxiliar, clases, cuatrimestre, anio, isActive, cursantes } = req.body
  const update = { cursantes }

  if (nombre) { update.nombre = nombre }
  if (jefeCatedra) { update.jefeCatedra = jefeCatedra }
  if (auxiliar) { update.auxiliar = auxiliar }
  if (clases) { update.clases = clases }
  if (cuatrimestre) { update.cuatrimestre = cuatrimestre }
  if (anio) { update.anio = anio }
  //que se cague el del front (enviar el listado completo de alumnos desde el front)
  // if (cursantes) { update.cursantes = cursantes }
  if (isActive !== undefined) { update.isActive = isActive }
  // console.log(update)

  if (update.nombre || update.jefeCatedra || update.auxiliar || update.clases || update.cuatrimestre || update.anio || update.isActive !== undefined) {
    try {
      const materia = await Materia.findByIdAndUpdate(id, update, { new: true })

      return res.json({
        msg: "Informacion de la materia actualizada"
      })

    } catch (error) {
      return res.status(401).json({
        msg: "Error al enviar los datos de actualizacion"
      })
    }
  }
}
controller.deleteMateria = async (req, res) => {

  const { id } = req.params

  try {
    const materia = await Materia.findByIdAndUpdate(id, { isActive: false }, { new: true })

    res.json({
      msg: "La materia se descart?? correctamente"
    })
  } catch (error) {
    res.status(500).json({
      msg: "Error al descartar materia"
    })
  }

}

module.exports = controller