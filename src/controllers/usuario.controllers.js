const Usuario = require("../models/usuario.models");

const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET
const controller = {};

//Obtener usuarios activos
controller.getUsuarios = async (_req, res) => {
  const usuarios = await Usuario.find({ isActive: true })

  res.json(usuarios)
}

//Obtener un usuario por id
controller.getUsuario = async (req, res) => {
  const { id } = req.params
  const decodedID = jwt.decode(id)

  try {
    const usuario = await Usuario.findOne({ _id: decodedID.id })

    const {infoPersonal, documentaciones, id = _id, nombreUsuario, contrasenia, correo, fotoPerfil, rol, isActive} = usuario
    
    res.json({infoPersonal, documentaciones, id, nombreUsuario, contrasenia, correo, fotoPerfil, rol, isActive})
  } catch (error) {
    res.json({
      msg: "Error al obtener usuario"
    })
  }
}

controller.loginUsuario = async (req, res) => {

  const {nombreUsuario, contrasenia} = req.body
  const usuario = await Usuario.findOne({nombreUsuario:nombreUsuario})
  console.log(req.body)
  if (usuario) {
    
    const isValid = bcryptjs.compareSync(contrasenia, usuario.contrasenia);

    if (isValid) {

      const token = jwt.sign({id: usuario._id, rol: usuario.rol}, SECRET,{
        expiresIn: 900
      })

      return res.status(200).json({
        msg: "Inicio de sesión exitoso.",
        loggedIn: true,
        token: token
      })

    } else {
      return res.status(401).json({
        msg: "Usuario y/o contraseñas incorrectas.",
        loggedIn: false
      })
    }
  } else {
    return res.status(401).json({
      msg: "Usuario y/o contraseñas incorrectas. usuario no encotnrado",
      loggedIn: false
    })
  }
}

//Crear usuario nuevo
controller.createUsuario = async (req, res) => {

  const { nombreUsuario, contrasenia, correo, infoPersonal, documentaciones, fotoPerfil, rol, datosEstudiante, datosProfesor, datosAdministrativo } = req.body

  const datos = { nombreUsuario, contrasenia, correo, infoPersonal, documentaciones, fotoPerfil, rol }

  if (datos.rol === 'estudiante') { datos.datosEstudiante = datosEstudiante }
  if (datos.rol === 'profesor') { datos.datosProfesor = datosProfesor }
  if (datos.rol === 'administrativo') { datos.datosAdministrativo = datosAdministrativo }

  try {
    const salt = bcryptjs.genSaltSync(8);
    datos.contrasenia = bcryptjs.hashSync(contrasenia, salt)

    const usuario = new Usuario(datos)
    await usuario.save()

    return res.json({
      msg: "Usuario creado",
    })
  } catch (error) {
    return res.status(401).json({
      msg: "Error al crear usuario",
      // error:error
    })
  }
}

//Actualziar usuario
controller.updateUsuario = async (req, res) => {

  const { id } = req.params

  const { nombreUsuario, correo, infoPersonal, documentaciones, fotoPerfil, rol, isActive, datosEstudiante, datosProfesor, datosAdministrativo } = req.body
  const update = {}

  if (nombreUsuario) { update.nombreUsuario = nombreUsuario }
  if (correo) { update.correo = correo }
  if (infoPersonal) { update.infoPersonal = infoPersonal }
  if (documentaciones) { update.documentaciones = documentaciones }
  if (fotoPerfil) { update.fotoPerfil = fotoPerfil }
  if (rol) { update.rol = rol }
  if (datosEstudiante) { update.datosEstudiante = datosEstudiante }
  if (datosProfesor) { update.datosProfesor = datosProfesor }
  if (datosAdministrativo) { update.datosAdministrativo = datosAdministrativo }
  if (isActive !== null) { update.isActive = isActive }

  console.log(update)
  if (update.nombreUsuario || update.correo || update.infoPersonal || update.documentaciones || update.fotoPerfil || update.rol || update.datosEstudiante || update.datosProfesor || update.datosAdministrativo || update.isActive !== null) {
    try {
      const usuario = await Usuario.findByIdAndUpdate(id, update, { new: true })

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

//Cambiar contraseña
controller.updatePass = async (req, res) => {
  const { id } = req.params
  let { contrasenia, nuevaContrasenia } = req.body
  const usuario = await Usuario.findById(id)

  const salt = bcryptjs.genSaltSync(8);
  // let hashedPass = bcryptjs.hashSync(contrasenia, salt)

  if (usuario) {

    const isValid = bcryptjs.compareSync(contrasenia, usuario.contrasenia);

    if (isValid) {

      nuevaContrasenia = bcryptjs.hashSync(nuevaContrasenia, salt)

      const update = await Usuario.findByIdAndUpdate(id, { contrasenia: nuevaContrasenia }, { new: true })
      return res.json({
        msg: "La contraseña se actualizó correctamente"
      })

    } else {
      return res.status(401).json({
        msg: "Error al actualizar la contraseña"
      })
    }
  }
}

//Borrar usuario
controller.deleteUsuario = async (req, res) => {
  const { id } = req.params

  try {
    const usuario = await Usuario.findByIdAndUpdate(id, { isActive: false }, { new: true })

    res.json({
      msg: "El usuario se eliminó correctamente"
    })
  } catch (error) {
    res.status(500).json({
      msg: "Error al eliminar usuario"
    })
  }
}

module.exports = controller;