const Materia = require("../models/materia.models");
const controller = {};

controller.getMaterias = async (_req, res) => {
    const materias = await Materia.find({ isActive: true })
        .populate('jefeCatedra auxiliar cursantes.estudiante', 'infoPersonal.nombres infoPersonal.nombres infoPersonal.nombres')
    
    const nuevoFormato = materias.map((element) => {

        const { _id, nombre, jefeCatedra, auxiliar, clases, cuatrimestre, anio, cursantes } = element
        const materia = { _id, nombre, clases, cuatrimestre, anio, cursantes }
        
        materia.jefeCatedra = jefeCatedra.infoPersonal.nombres
        materia.auxiliar = auxiliar.infoPersonal.nombres
        const temp = cursantes.map((element, index) => {
            const temp = element.estudiante.infoPersonal.nombres
            materia.cursantes[index].estudiante = temp
        })

        console.log(temp)

        return materia
    })
    
    res.json(nuevoFormato)
}

controller.getMateria = async (req, res) => {
    const { id } = req.params

    try {
        const materia = await Materia.findOne({ _id: id })
            .populate('jefeCatedra', 'infoPersonal.nombres')
            .populate('auxiliar', 'infoPersonal.nombres')

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
        // return console.log(error)
        return res.status(401).json({
            msg: "Error al crear materia",
        })
    }
}
controller.updateMateria = async (req, res) => {
    const { id } = req.params
    const { nombre, jefeCatedra, auxiliar, clases, cuatrimestre, anio, isActive, cursantes } = req.body
    const update = {}

    if (nombre)         { update.nombre = nombre }
    if (jefeCatedra)    { update.jefeCatedra = jefeCatedra }
    if (auxiliar)       { update.auxiliar = auxiliar }
    if (clases)         { update.clases = clases }
    if (cuatrimestre)   { update.cuatrimestre = cuatrimestre}
    if (anio)           { update.anio = anio }
    if (cursantes)      { update.cursantes = cursantes }
    if (isActive)       { update.isActive = isActive }

    if (update.nombre || update.jefeCatedra || update.auxiliar || update.clases || update.cuatrimestre || update.anio || update.cursantes || update.isActive ) {
        
        try {
            const materia = await Usuario.findByIdAndUpdate(id, update, { new: true })

            return res.json({
                msg: "Informacion del usuario actualizada"
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

module.exports = controller