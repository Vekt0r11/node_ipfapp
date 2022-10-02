const {
  Schema,
  model
} = require('mongoose')
const Materia = require('./materia.models')

const CarreraSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  }, 
  tituloOtorga: {
    type: String,
    required: true,
    unique: true
  },
  duracion: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  modalidad: {
    type: String,
    enum: ["virtual", "presencial"],
    required: true
  },
  materias:[{
    materia: {
      type: Schema.Types.ObjectId,
      ref: 'Materia'
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
})

module.exports = Carrera = model('Carrera', CarreraSchema)