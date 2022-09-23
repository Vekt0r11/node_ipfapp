# Instituto Superior Random - Modelos

***22/09/2022***

Los siguientes modelos no son totalmente útiles en un entorno de desarrollo, solo son una aproximación.*
Los modelos estan sujetos al cambio en el transcurso del desarrollo.**

---
### Usuarios
```js
{
  _id; Schema.Types.ObjectId
  nombreUsuario: String
  contrasenia: String,
  correo: String,
  infoPersonal: {
    nombres: String,
    apellidos: String,
    fechaNac: Date,
    telefono: String
  },
  documentaciones: {
    dni: String,
    tituloSecundario: String,
    tituloTerciario: String,
    certificadoDomicilio: String
  },
  fotoPerfil: String,
  rol: Enum: ["administrativo", "profesor", "estudiante"],
  
  datosEstudiante: {
    carrera: { type: Schema.Types.ObjectId, ref: 'Carrera' }
  },
  datosProfesor: {
    numeroLegajo: String,
    titulacionAcademica: String
  },
  datosAdministrativo: {
    cargo: String
  },

  isActive: Boolean,
}

```
---
## Materias
```js
{
  _id: Schema.Types.ObjectId,
  nombre: String,
  jefeCatedra: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  auxiliar: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  clases: Number,
  cuatrimestre: Number,
  anio: Number,

  cursantes: [{
    estudiante: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    asistencia: Number,
    primerParcial: Number,
    segundoParcial: Number,
    final: Number
  }]

  anuncios:[{
    anuncio: {type: Schema.Types.ObjectId, ref: 'Anuncio'}
  }]

  isActive: Boolean
}
```
---
## Carreras
```js
{
  _id: Schema.Types.ObjectId,
  nombre: String,
  tituloOtorga: String,
  duracion: Number,
  descripcion: String,
  modalidad: Enum: ["virtual", "presencial"],
  materias:[
    {
      materia: { type: Schema.Types.ObjectId, ref: 'Materia' }
    }
  ],

  anuncios:[{
    anuncio: {type: Schema.Types.ObjectId, ref: 'Anuncio'}
  }]

  isActive: Boolean
}
```
---
## Anuncios
```js
{
  _id: Schema.Types.ObjectId,
  autor: { type: Schema.Types.ObjectId, ref: 'Usuario' }
  titulo: String,
  descripcion: String,
  fecha: Date,
  tipo: Enum: ["general", "materia"],
  
  materia: { type: Schema.Types.ObjectId, ref: 'Materia' },
  carrera: { type: Schema.Types.ObjectId, ref: 'Carrera' }
  
  isActive: Boolean
}
```