const {
    Schema,
    model
} = require('mongoose')
const Materia = require('./materia.models')
const Carrera = require('./carrera.models')

const AnuncioSchema = new Schema({
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    tipo: {
        type: String,
        Enum: ['general','materia'],
        required: true
    },
    materia: {
        type: Schema.Types.ObjectId,
        ref: 'Materia'
    },
    carrera: {
        type: Schema.Types.ObjectId,
        ref: 'Carrera'
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

module.exports = Anuncio = model('Anuncio', AnuncioSchema)