const {
  Schema,
  model
} = require('mongoose')
const Usuario = require('./usuario.models')

const MateriaSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  jefeCatedra: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  auxiliar: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  clases: {
    type: Number,
    required: true
  },
  cuatrimestre: {
    type: Number,
    required: true
  },
  anio: {
    type: Number,
    required: true
  },
  isActive:{
    type: Boolean,
    default: true
  },

  cursantes: [{
    estudiante: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario'
    },
    asistencia: {
      type: Number,
      required: true
    },
    primerParcial: {
      type: Number,
      required: true
    },
    segundoParcial: {
      type: Number,
      required: true
    },
    final: {
      type: Number,
      required: true
    }
  }]
})

module.exports = Materia = model('Materia', MateriaSchema)