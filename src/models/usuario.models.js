const { Schema, model } = require('mongoose')
const Carrera = require('./carrera.models')

const UsuarioSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
  },
  contrasenia: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true
  },
  infoPersonal: {
    nombres: {
      type: String,
      required: true,
    },
    apellidos: {
      type: String,
      required: true,
    },
    fechaNac: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
      unique: true
    }
  },
  documentaciones: {
    dni: {
      type: String,
      required: true,
      unique: true
    },
    tituloSecundario: {
      type: String,
      required: true
    },
    tituloTerciario: {
      type: String,
      default: null
    },
    certificadoDomicilio: {
      type: String,
      required: true
    }
  },
  fotoPerfil: {
    type: String,
    default: null
  },
  rol: {
    type: String,
    enum: ["administrativo", "profesor", "estudiante"],
    required: true,
  },

  datosEstudiante: {
    carrera: {
      type: Schema.Types.ObjectId,
      ref: 'Carrera'
    }
  },
  datosProfesor: {
    numeroLegajo: {
      type: String,
      unique: true
    },
    titulacionAcademica: {
      type: String
    }
  },
  datosAdministrativo: {
    cargo: {
      type: String
    }
  },

  isActive: {
    type: Boolean,
    default: true
  },
})

module.exports = Usuario = model('Usuario', UsuarioSchema)