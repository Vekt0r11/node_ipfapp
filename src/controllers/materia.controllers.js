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

controller.addCursante = async (req, res) => {

	//ID de la materia
	const { id } = req.params.id

	try {
		const newCursante = { estudiante, asistencia, primerParcial, segundoParcial, final } = req.body

		const materia = await Materia.updateOne({ _id: id }, { $push: { cursantes: newCursante } }, {new: true})

		res(500).json({
			msg: 'El alumno se agregó correctamente'
		})
	} catch (error) {
		res(401).json({
			msg: 'Error al agregar alumno a la materia'
		})
	}

}

controller.updateInfoCursante = async (req, res) => {
	try {
		//Pasar id del objeto del cursante
		const { id } = req.params.id

		const materia = await Materia.findOne({ id })
		const { cursantes } = materia

		cursantes.filter((estudiante, key) => {
			const { _id } = estudiante

			if (id = _id) {
				const { estudiante, asistencia, primerParcial, segundoParcial, final, isActive } = req.body
				materia.cursantes[0] = { estudiante, asistencia, primerParcial, segundoParcial, final, isActive }
			}
			materia.save()
		})
		return res.status(200).json('La informacion del estudiante se actualizó correctamente')
	} catch (error) {
		return res.status(500).json('Error al actualizar la informacion del estudiante')
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
			msg: "La materia se descartó correctamente"
		})
	} catch (error) {
		res.status(500).json({
			msg: "Error al descartar materia"
		})
	}

}

module.exports = controller