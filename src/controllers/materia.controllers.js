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

        return materia
    })

    res.json(nuevoFormato)
}

controller.getMateria = async (req, res) => {
    const { id } = req.params

    try {
        const materia = await Materia.findOne({ _id: id })
            .populate('cursantes.estudiante jefeCatedra auxiliar', 'cursantes.estudiante.infoPersonal.nombres infoPersonal.nombres infoPersonal.nombres')

        const { _id, nombre, jefeCatedra, auxiliar, clases, cuatrimestre, anio, cursantes } = materia
        const materiaFormateada = { _id, nombre, clases, cuatrimestre, anio, cursantes }

        materiaFormateada.jefeCatedra = jefeCatedra.infoPersonal.nombres
        materiaFormateada.auxiliar = auxiliar.infoPersonal.nombres

        res.json(materiaFormateada)
    } catch (error) {
        res.json({
            msg: "Error al obtener materia"
        })
    }
}
controller.createMateria = async (req, res) => {

    const datos = { nombre, jefeCatedra, auxiliar, clases, cuatrimestre, anio, isActive, cursantes } = req.body

    const materias = await Materia.find({ isActive: true })
        .populate({
            path: 'jefeCatedra auxiliar cursantes.estudiante',
            select: 'infoPersonal.nombres infoPersonal.nombres isActive infoPersonal.nombres',
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
controller.updateMateria = async (req, res) => {
    const { id } = req.params

    const { nombre, jefeCatedra, auxiliar, clases, cuatrimestre, anio, isActive, cursantes } = req.body
    const update = {}

    //Actualizar cursantes en otro endpoint?
    //Conlleva otra request tipo PUT al servidorf

    //Actualizar cursantes en este endpoint
    //Conlleva una petición 

    if              (nombre){ update.        nombre = nombre        }
    if         (jefeCatedra){ update.   jefeCatedra = jefeCatedra   }
    if            (auxiliar){ update.      auxiliar = auxiliar      }
    if              (clases){ update.        clases = clases        }
    if        (cuatrimestre){ update.  cuatrimestre = cuatrimestre  }
    if                (anio){ update.          anio = anio          }
    if           (cursantes){ update.     cursantes = cursantes     }
    if   (isActive !== null){ update.      isActive = isActive      }

    console.log(update)
    if (update.nombre || update.jefeCatedra || update.auxiliar || update.clases || update.cuatrimestre || update.anio || update.cursantes || update.isActive !== null) {
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
            msg: "La materia se descartó correctamente"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error al descartar materia"
        })
    }

}

module.exports = controller