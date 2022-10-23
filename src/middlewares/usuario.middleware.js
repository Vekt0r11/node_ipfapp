const { checkSchema } = require('express-validator')

exports.verifyUsuario = checkSchema({
  'infoPersonal.nombres':{
    isString:{
      errorMessage: 'Los nombres deben ser tipo String.'
    },
    isLength:{
      options:{
        min: 3,
        max: 48
      },
      errorMessage: 'Los nombres deben ser de 3 a 48 caracteres de longitud.'
    }
  },
  'infoPersonal.apellidos':{
    isString:{
      errorMessage: 'Los apellidos deben ser tipo String.'
    },
    isLength:{
      options:{
        min: 3,
        max: 48
      },
      errorMessage: 'Los apellidos deben ser de 3 a 48 caracteres de longitud.'
    }
  },
  'infoPersonal.fechaNac': {
    isString:{
      errorMessage: 'La fecha de nacimiento debe ser tipo String.'
    },
    matches:{
      options:[/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/],
      errorMessage:'El formato de fecha incorrecto.'
    }
  },
  'infoPersonal.telefono':{
    isLength:{
      options:{
        min:10,
        max:14
      },
      errorMessage: 'El número de teléfono es invalido.'
    },
    matches:{
      options:[/^\d+$/],
      errorMessage:'El número de teléfono solo debe contener números.'
    },
  },
  'infoPersonal.residencia':{
    isString:{
      errorMessage: 'La residencia deben ser tipo String.'
    },
    isLength:{
      options:{
        min: 5,
        max: 48
      },
      errorMessage: 'La residencia debe ser de 5 a 48 caracteres de longitud.'
    }
  },
  'documentaciones.dni':{
    isString:{
      errorMessage:'El DNI debe ser tipo String.'
    },
    matches:{
    options:[/1*[A-Z][0-9]{7}|[0-9]{7}/],
      errorMessage:'El DNI es inválido.'
    },
  },
  'documentaciones.tituloSecundario':{
    isURL:{
      errorMessage: 'El titulo secundario debe ser la URL de una imagen.'
    }
  },
  'documentaciones.tituloTerciario':{
    optional: true,
    isURL:{
      errorMessage: 'El titulo terciario debe ser la URL de una imagen.'
    }
  },
  'documentaciones.certificadoDomicilio':{
    isURL:{
      errorMessage: 'El certificado de domicilio debe ser la URL de una imagen.'
    }
  },
  nombreUsuario:{
    isString:{
      errorMessage:'El nombre de usuario debe ser tipo String.'
    },
    isLength:{
      options:{
        min:5,
        max:16
      },
      errorMessage: 'El nombre de usuario debe tener de 5 a 16 caracteres de longitud.'
    },
    matches:{
      options:[/[A-z-0-9]/],
      errorMessage:'El nombre de usuario es inválido.'
    },
  },
  contrasenia:{
    isString:{
      errorMessage:'La contraseña debe ser tipo String.'
    },
    isLength:{
      options:{
        min:8,
        max:16
      },
      errorMessage: 'La contraseña debe tener de 8 a 16 caracteres de longitud.'
    },
    matches:{
      options:[/[A-z-0-9]/],
      errorMessage:'La contraseña es inválida.'
    },
  },
  correo:{
    isEmail:{
      bail: true,
      errorMessage: 'El formato de correo electrónico es inválido.'
    }
  },
  fotoPerfil:{
    optional: true,
    isURL:{
      errorMessage: 'El titulo terciario debe ser la URL de una imagen.'
    }
  },
  rol:{
    isString:{
      errorMessage: 'El rol debe ser de tipo String.'
    },
    matches:{
      options:[/\b(?:estudiante|profesor|administrativo)\b/],
      errorMessage: 'Rol no contemplado.'
    }
  }
})