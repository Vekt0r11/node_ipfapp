const Anuncio = require("../models/anuncio.models");
const controller = {};

controller.getAnuncios = async (_req, res) => {
  const anuncios = await Anuncio.find({ isActive: true })
    .populate('autor carrera materia', 'infoPersonal.nombres nombre nombre')

  const anunciosFormateados = anuncios.map((element) => {

    const { _id, autor, titulo, descripcion, fecha, tipo, carrera, materia } = element
    const anuncio = { _id, titulo, descripcion, fecha, tipo }

    anuncio.autor = { nombres: autor.infoPersonal.nombres, _id: autor._id }

    if (carrera) { anuncio.carrera = carrera.nombre }
    if (materia) { anuncio.materia = materia.nombre }

    return anuncio
  })

  res.json(anunciosFormateados)
}

controller.getAnuncio = async (req, res) => {
  const { id } = req.params

  try {
    const anuncio = await Anuncio.findOne({ _id: id })
      .populate('autor carrera materia', 'infoPersonal.nombres nombre nombre')

    const { _id, autor, titulo, descripcion, fecha, tipo, carrera, materia } = anuncio
    const anuncioFormateado = { _id, titulo, descripcion, fecha, tipo }

    anuncioFormateado.autor = autor.infoPersonal.nombres
    if (carrera) { anuncio.carrera = carrera.nombre }
    if (materia) { anuncio.materia = materia.nombre }

    res.json(anuncioFormateado)
  } catch (error) {
    res.json({
      msg: "Error al obtener anuncio"
    })
  }
}
controller.createAnuncio = async (req, res) => {

  const datos = { autor, titulo, descripcion, fecha, materia, carrera } = req.body

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
  const { id } = req.params
  const { titulo, descripcion, isActive } = req.body
  const update = {}

  if (titulo) { update.titulo = titulo }
  if (descripcion) { update.descripcion = descripcion }
  if (isActive !== null) { update.isActive = isActive }

  if (update.titulo || update.descripcion || update.isActive !== null) {

    try {
      const anuncio = await Anuncio.findByIdAndUpdate(id, update, { new: true })

      return res.json({
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
      msg: "El anuncio se descartó correctamente"
    })
  } catch (error) {
    res.status(500).json({
      msg: "Error al descartar anuncio"
    })
  }

}

module.exports = controller