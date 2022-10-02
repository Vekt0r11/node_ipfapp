const route = require("express").Router();
const { 
  getCarrera,
  getCarreras,
  createCarrera,
  updateCarrera,
  deleteCarrera
} = require("../controllers/carrera.controllers");

route.get("/", getCarreras); //
route.get("/:id", getCarrera); //

route.post("/create", createCarrera); //

route.put("/:id", updateCarrera); //

route.delete("/:id", deleteCarrera);//

module.exports = route;