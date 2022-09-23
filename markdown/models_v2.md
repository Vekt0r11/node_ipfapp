# Instituto Random - Modelo de datos (descartado)

***15/09/2022***

## Usuarios
```js
{
    idUser: Number,
    username: String,
    password: String,
    email:String,
    personalInfo:{
        name: String,
        lastName: String,
        birthDate: Date,
        dni: String,
        phoneNumber: String,
    },
    documentaciones: {
        dni: String,
        tituloSecundario: String,
        tituloTerciario: String,
        certificadoDomicilio: String
    },
    profilePicture: String,
    role:Enum["estudiante","profesor","administrativo"],
    /
    datosEstudiante:{

    },
    datosProfesor: {
        numeroLegajo: String,
        
    },
    datosDirectivo: {
        cargo: String
    }
    isActive: Boolean

}
```

## Materias
```js
{
    idSubject: Number,
    name: String,
    quadrimester: Number,
    year: Number,
    totalClasses: Number,
    teacher: _idUser,
    auxiliar: _idUser
    rendimientoAcademico:[{ //populate
        student: {Schema.Types.ObjectId, ref: 'Estudiante'},
        asistencia: Number,
        firstExam: Number,
        secondExam: Number,
        finalExamn: Number
    }]
}
```

## Carreras
```js
{
    idCareer: Number,
    title: String,
    subjects: [
        materias: {Schema.Tyupes.ObjectId, ref: 'Materias'}
    ] //populate
}
```

## Estudiantes
```js

```
## Profesores
```js

```
## Administrativos
```js

```
## Cohortes
```js

```