const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
require("./src/databases/mongodb.connection");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//add helmet
//add express-validator?¿
//add jwt

// Setttings
app.set("port", process.env.PORT || 4000);

// Routes
app.use("/user", require("./src/routes/usuario.routes")); //Basic test done
app.use("/materia", require("./src/routes/materia.routes")); //Basic test done
app.use("/carrera", require("./src/routes/carrera.routes")); //Basic test done
app.use("/anuncio", require("./src/routes/anuncio.routes")); //Basic test done

app.listen(app.get("port"), () =>
  console.log(`Example app listening on port ${app.get("port")}!`)
);
