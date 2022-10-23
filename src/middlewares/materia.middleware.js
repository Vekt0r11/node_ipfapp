const { checkSchema } = require('express-validator')

exports.verifyMateria = checkSchema({
  nombre: {
    isString: {
      errorMessage: 'El nombre debe ser tipo String.'
    },
    isLength: {
      options: {
        min: 5,
        max: 48
      },
      errorMessage: 'El nombre debe ser de 5 a 48 caracteres de longitud.'
    }
  },
  clases: {
    isLength: {
      options: {
        min: 2,
        max: 3
      },
      errorMessage: 'La longitud debe ser de 2 a 3 caracteres.'
    },
    isInt: {
      options: {
        min: 18,
        max: 120,
        allow_leading_zeroes: false
      },
      errorMessage: 'La cantidad de clases debe ser de 18 hasta 120 clases.'
    }
  },
  cuatrimestre: {
    isLength: {
      options: {
        min: 1,
        max: 2
      },
      errorMessage: 'La longitud debe ser de 1 a 2 caracteres.'
    },
    isInt: {
      options: {
        min: 2,
        max: 12,
        allow_leading_zeroes: false
      },
      errorMessage: 'El cuatrimestre debe estar entre 2 y 12.'
    }
  },
  anio: {
    isNumeric: {
      errorMessage: 'El año debe ser numérico.'
    },
    isInt: {
      options: {
        min: 2021
      },
      errorMessage: 'Las materias se dictan desde el año 2021 en adelante.'
    },
    isLength: {
      options: {
        min: 4,
        max: 4
      },
      errorMessage: 'El año debe expresarse en 4 caracteres.'
    }
  },
  cursantes: {
    isArray: {
      options: {
        min: 1,
        max: 50
      },
      errorMessage: 'La cantidad de cursantes solo puede ser de 1 a 50.'
    }
  },
  'cursantes[*].asistencia': {
    isInt: {
      options: {
        min: 0,
        max: 120
      },
      errorMessage: 'La asistencia debe ser de 0 a 120.'
    }
  },
  'cursantes[*].primerParcial': {
    isInt: {
      options: {
        min: 1,
        max: 10,
        allow_leading_zeroes: false
      },
      errorMessage: 'La nota del primer parcial debe ser del 1 al 10.'
    }
  },
  'cursantes[*].segundoParcial': {
    isInt: {
      options: {
        min: 1,
        max: 10,
        allow_leading_zeroes: false
      },
      errorMessage: 'La nota del segundo parcial debe ser del 1 al 10.'
    }
  },
  'cursantes[*].final': {
    isInt: {
      options: {
        min: 1,
        max: 10,
        allow_leading_zeroes: false
      },
      errorMessage: 'La nota final debe ser del 1 al 10.'
    }
  },
})

exports.verifyCursante = checkSchema({
  'cursantes[*].asistencia': {
    isInt: {
      options: {
        min: 0,
        max: 120
      },
      errorMessage: 'La asistencia debe ser de 0 a 120.'
    }
  },
  'cursantes[*].primerParcial': {
    isInt: {
      options: {
        min: 1,
        max: 10,
        allow_leading_zeroes: false
      },
      errorMessage: 'La nota del primer parcial debe ser del 1 al 10.'
    }
  },
  'cursantes[*].segundoParcial': {
    isInt: {
      options: {
        min: 1,
        max: 10,
        allow_leading_zeroes: false
      },
      errorMessage: 'La nota del segundo parcial debe ser del 1 al 10.'
    }
  },
  'cursantes[*].final': {
    isInt: {
      options: {
        min: 1,
        max: 10,
        allow_leading_zeroes: false
      },
      errorMessage: 'La nota final debe ser del 1 al 10.'
    }
  },
})