const route = require("express").Router();
const { 
  getMateria,
  getMaterias,
  createMateria,
  updateMateria,
  deleteMateria
} = require("../controllers/materia.controllers");

// normal:
route.get("/", getMaterias); //
route.get("/:id", getMateria); //

route.post("/create", createMateria); //

route.put("/:id", updateMateria); //

route.delete("/:id", deleteMateria);//

module.exports = route;