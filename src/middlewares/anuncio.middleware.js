const { checkSchema } = require('express-validator')

exports.verifyAnuncio = checkSchema({
  titulo: {
    isString: {
      errorMessage: 'El título debe ser de tipo String.'
    },
    isLength: {
      options: {
        min: 6,
        max: 42
      },
      errorMessage: 'El título debe ser de 6 a 32 carateres de longitud.'
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
      errorMessage: 'La descripción debe ser de 16 a 512 caracteres de longitud'
    },
  }
})