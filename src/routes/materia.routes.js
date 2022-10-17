const route = require("express").Router();

const { 
  getMateria,
  getMaterias,
  createMateria,
  updateMateria,
  deleteMateria
} = require("../controllers/materia.controllers");


route.get("/", getMaterias); //
route.get("/:id", getMateria); //

route.post("/create", createMateria); //

// route.put("/planilla/:id", updatePlanilla)
route.put("/:id", updateMateria); //

route.delete("/:id", deleteMateria);//

module.exports = route;