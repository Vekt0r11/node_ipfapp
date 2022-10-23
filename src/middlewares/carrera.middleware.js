const { checkSchema } = require('express-validator')

exports.verifyCarrera = checkSchema({
  nombre:{
    isString:{
      errorMessage: 'El nombre debe ser de tipo String.'
    },
    isLength:{
      options:{
        min: 8,
        max: 72
      },
      errorMessage: 'El nombre debe ser de 8 a 72 caracteres de longitud.'
    }
  },
  tituloOtorga:{
    isString:{
      errorMessage: 'El nombre del titulo a otorgar debe ser de tipo String.'
    },
    isLength:{
      options:{
        min: 8,
        max: 72
      },
      errorMessage: 'El nombre del titulo a otorgar debe ser de 8 a 72 caracteres de longitud.'
    }
  },
  duracion:{
    isInt:{
      errorMessage: 'La duración debe ser un número mayor a 0.'
    },
  },
  descripcion: {
    isString: {
      errorMessage: 'La descripción debe ser de tipo String.'
    },
    isLength: {
      options: {
        min: 16,
        max: 512
      },
      errorMessage: 'La descripción debe ser de 16 a 1024 caracteres de longitud'
    },
  },
  modalidad:{
    isString:{
      errorMessage: 'La modalidad debe ser de tipo String.'
    },
    matches: {
      options:[/\b(?:virtual|presencial)\b/],
      errorMessage: 'Modalidad no contemplada.'
    }
  },
  materias:{
    isArray:{
      options:{
        min:1
      },
      errorMessage: 'La lista de materias no debe estar vacía.',
    }
  }
})