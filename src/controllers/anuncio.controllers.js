const Anuncio = require("../models/anuncio.models");
const Materia = require("../models/materia.models");
const controller = {};

controller.getAnuncios = async (req, res) => {
  const { tipo, materia } = req.params

  const query = { isActive: true }

  if (tipo) {
    query.tipo = tipo
  }
  if (materia) {
    query.materia = materia
  }

  const anuncios = await Anuncio.find(query)
    .populate('autor carrera materia', 'infoPersonal.nombres nombre nombre')

  const anunciosFormateados = anuncios.map((element) => {

    const { _id, autor, titulo, descripcion, fecha, tipo, carrera, materia } = element
    const anuncio = { _id, titulo, descripcion, fecha, tipo }

    anuncio.autor = { nombres: autor.infoPersonal.nombres, _id: autor._id }

    if (carrera) { anuncio.carrera = carrera }
    if (materia) { anuncio.materia = materia }

    return anuncio
  })

  res.json(anunciosFormateados)
}

controller.getAnunciosEstudiante = async (req, res) => {

  const { id } = req.params

  try {
    const materias = await Materia.find({ isActive: true, cursantes: { $elemMatch: { estudiante: { $eq: id } } } })
    const idMaterias = materias.map(element => element._id)

    const anuncios = []

    for (let i = 0; i < idMaterias.length; i++) {
      anuncios.push(
        ...await Anuncio.find({ isActive: true, materia: idMaterias[i] })
          .populate({
            path: 'autor carrera materia',
            select: 'infoPersonal.nombres infoPersonal.apellidos nombre nombre'
          })
          .select('-__v')
      )
    }

    const anunciosOrdenados = anuncios.sort((a,b) => {
      return new Date(b.fecha) - new Date(a.fecha)
    })

    res.json(anunciosOrdenados)

  } catch (error) {

  }
}

controller.getAnuncio = async (req, res) => {
  const { id } = req.query

  try {
    const anuncio = await Anuncio.findOne({ _id: id })
      .populate('autor carrera materia', 'infoPersonal.nombres nombre nombre')

    const { _id, autor, titulo, descripcion, fecha, tipo, carrera, materia } = anuncio
    const anuncioFormateado = { _id, titulo, descripcion, fecha, tipo }

    anuncioFormateado.autor = autor.infoPersonal.nombres
    if (carrera) { anuncio.carrera = carrera }
    if (materia) { anuncio.materia = materia }

    res.json(anuncioFormateado)
  } catch (error) {
    res.json({
      msg: "Error al obtener anuncio"
    })
  }
}
controller.createAnuncio = async (req, res) => {

  const { autor, titulo, descripcion, materia, carrera } = req.body
  const datos = { autor, titulo, descripcion, materia, carrera }
  datos.fecha = new Date().toString()

  if (materia) {
    datos.tipo = 'materia'
  }
  if (carrera) {
    datos.tipo = 'carrera'
  }

  try {

    const anuncio = new Anuncio(datos)
    await anuncio.save()

    return res.json({
      msg: "Anuncio creado",
    })
  } catch (error) {
    return res.status(401).json({
      msg: "Error al crear anuncio",
    })
  }
}
controller.updateAnuncio = async (req, res) => {
  const { _id, titulo, descripcion } = req.body
  const update = {}

  if (titulo) { update.titulo = titulo }
  if (descripcion) { update.descripcion = descripcion }

  if (update.titulo || update.descripcion) {

    try {
      const anuncio = await Anuncio.findByIdAndUpdate(_id, update, { new: true })

      return res.status(200).json({
        msg: "Informacion del anuncio actualizada"
      })

    } catch (error) {
      res.status(401).json({
        msg: "Error al enviar los datos de actualizacion"
      })
    }
  }

}
controller.deleteAnuncio = async (req, res) => {

  const { id } = req.params
  try {
    const anuncio = await Anuncio.findByIdAndUpdate(id, { isActive: false }, { new: true })

    res.json({
      msg: "El anuncio se descart?? correctamente"
    })
  } catch (error) {
    res.status(500).json({
      msg: "Error al descartar anuncio"
    })
  }

}

module.exports = controller