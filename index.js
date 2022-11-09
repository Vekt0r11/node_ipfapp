const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
require("dotenv").config();
require("./src/databases/mongodb.connection");

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//add helmet
//add express-validator?¿
//add jwt

// Setttings
app.set("port", process.env.PORT || 4000);

// Routes
app.use("/usuario", require("./src/routes/usuario.routes"));
app.use("/materia", require("./src/routes/materia.routes"));
app.use("/carrera", require("./src/routes/carrera.routes"));
app.use("/anuncio", require("./src/routes/anuncio.routes"));

app.listen(app.get("port"), () =>
  console.log(`Example app listening on port ${app.get("port")}!`)
);
