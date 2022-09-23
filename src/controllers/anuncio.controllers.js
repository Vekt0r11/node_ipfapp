const Anuncio = require("../models/anuncio.models");
const controller = {};

controller.getAnuncios = async (_req, res) => {
    const anuncios = await Anuncio.find({ isActive: true })

    res.json(anuncios)
}

controller.getAnuncio = async (req, res) => {
    const { id } = req.params

    try {
        const anuncio = await Anuncio.findOne({ _id: id })

        res.json(anuncio)
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
    const datos = { titulo, descripcion, isActive } = req.body
    const update = {}

    if (titulo)         { update.titulo }
    if (descripcion)    { update.descripcion }
    if (isActive)       { update.isActive }


    if (update.titulo || update.descripcion || update.isActive) {
        
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