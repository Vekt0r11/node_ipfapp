const route = require("express").Router();

const {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  updatePass,
  deleteUsuario,
} = require("../controllers/usuario.controllers");

route.get("/", getUsuarios); //
route.get("/:id", getUsuario); //

route.post("/create", createUsuario); //

route.put("/password/:id", updatePass); //
route.put("/:id", updateUsuario); //

route.delete("/:id", deleteUsuario);//

module.exports = route;
