const Materia = require("../models/materia.models");
const controller = {};

controller.getMaterias = async (_req, res) => {
    const materias = await Materia.find({ isActive: true })

    res.json(materias)
}

controller.getMateria = async (req, res) => {
    const { id } = req.params

    try {
        const materia = await Materia.findOne({ _id: id })

        res.json(materia)
    } catch (error) {
        res.json({
            msg: "Error al obtener materia"
        })
    }
}
controller.createMateria = async (req, res) => {

    const datos = { nombre, jefeCatedra, auxiliar, clases, cuatrimestre, anio, isActive, cursantes } = req.body

    try {

        const materia = new Materia(datos)
        await materia.save()

        return res.json({
            msg: "Materia creada",
        })
    } catch (error) {
        return res.status(401).json({
            msg: "Error al crear materia",
        })
    }
}
controller.updateMateria = async (req, res) => {
    const { id } = req.params
    const datos = { nombre, jefeCatedra, auxiliar, clases, cuatrimestre, anio, isActive, cursantes } = req.body
    const update = {}

    if (nombre)         { update.nombre }
    if (jefeCatedra)    { update.jefeCatedra }
    if (auxiliar)       { update.auxiliar }
    if (clases)         { update.clases }
    if (cuatrimestre)   { update.cuatrimestre }
    if (anio)           { update.anio }
    if (isActive)       { update.isActive }
    if (cursantes)      { update.cursantes }

    if (update.nombre || update.jefeCatedra || update.auxiliar || update.clases || update.cuatrimestre || update.anio || update.cursantes || update.isActive) {
        
        try {
            const materia = await Usuario.findByIdAndUpdate(id, update, { new: true })

            return res.json({
                msg: "Informacion del usuario actualizada"
            })

        } catch (error) {
            res.status(401).json({
                msg: "Error al enviar los datos de actualizacion"
            })
        }
    }

}
controller.deleteMateria = async (req, res) => {

    const { id } = req.params

    try {
        const materia = await Usuario.findByIdAndUpdate(id, { isActive: false }, { new: true })

        res.json({
            msg: "La materia se descartó correctamente"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error al descartar materia"
        })
    }

}