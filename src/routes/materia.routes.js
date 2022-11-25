const route = require("express").Router();
const { verifyMateria, verifyCursante } = require('../middlewares/materia.middleware')
const { validate } = require('../util/validate')

const { getMateria, getMaterias, createMateria, updateMateria, deleteMateria, addCursante, updateInfoCursante, getAsignadas } = require("../controllers/materia.controllers");


route.get("/", getMaterias)
route.get("/asignadas/", getAsignadas)
route.get("/:id", getMateria)

route.post("/create",
  [verifyMateria, validate],
  createMateria)
route.post("/cursante/:id",
  [verifyCursante, validate],
  addCursante)

route.put("/cursante/", updateInfoCursante)
route.put("/:id", updateMateria)

route.delete("/:id", deleteMateria)

module.exports = route;