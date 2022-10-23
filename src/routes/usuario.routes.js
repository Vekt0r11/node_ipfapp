const route = require("express").Router();
const { verifyUsuario } = require('../middlewares/usuario.middleware')
const { validate } = require('../util/validate')

const { getUsuarios, getUsuario, createUsuario, updateUsuario, updatePass, deleteUsuario, } = require("../controllers/usuario.controllers");

route.get("/", getUsuarios);
route.get("/:id", getUsuario);

route.post("/create",
  [verifyUsuario, validate]
  , createUsuario);

route.put("/password/:id", updatePass);
route.put("/:id", updateUsuario);

route.delete("/:id", deleteUsuario);

module.exports = route;
