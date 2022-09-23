const Carrera = require("../models/carrera.models");
const controller = {};

controller.getCarreras = async (_req, res) => {
    const carreras = await Carrera.find({ isActive: true })

    res.json(carreras)
}

controller.getCarrera = async (req, res) => {
    const { id } = req.params

    try {
        const carrera = await Carrera.findOne({ _id: id })

        res.json(carrera)
    } catch (error) {
        res.json({
            msg: "Error al obtener carrera"
        })
    }
}
controller.createCarrera = async (req, res) => {

    const datos = { nombre, tituloOtorga, duracion, descripcion, modalidad, materias } = req.body

    try {

        const carrera = new Carrera(datos)
        await carrera.save()

        return res.json({
            msg: "Carrera creada",
        })
    } catch (error) {
        return res.status(401).json({
            msg: "Error al crear carrera",
        })
    }
}
controller.updateCarrera = async (req, res) => {
    const { id } = req.params
    const datos = { nombre, tituloOtorga, duracion, descripcion, modalidad, materias, isActive } = req.body
    const update = {}

    if (nombre)         { update.nombre }
    if (tituloOtorga)   { update.tituloOtorga }
    if (duracion)       { update.duracion }
    if (descripcion)    { update.descripcion }
    if (modalidad)      { update.modalidad }
    if (materias)       { update.materias }
    if (isActive)       { update.isActive }

    if (update.nombre || update.tituloOtorga || update.duracion || update.descripcion || update.modalidad || update.materias || update.isActive) {
        
        try {
            const carrera = await Carrera.findByIdAndUpdate(id, update, { new: true })

            return res.json({
                msg: "Informacion de la carrera actualizada"
            })

        } catch (error) {
            res.status(401).json({
                msg: "Error al enviar los datos de actualizacion"
            })
        }
    }

}
controller.deleteCarrera = async (req, res) => {

    const { id } = req.params

    try {
        const carrera = await Carrera.findByIdAndUpdate(id, { isActive: false }, { new: true })

        res.json({
            msg: "La carrera se descartó correctamente"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error al descartar carrera"
        })
    }

}