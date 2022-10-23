const route = require("express").Router();
const {verifyCarrera} = require('../middlewares/carrera.middleware')
const {validate} = require('../util/validate')

const { getCarrera, getCarreras, createCarrera, updateCarrera, deleteCarrera } = require("../controllers/carrera.controllers");

route.get("/", getCarreras);
route.get("/:id", getCarrera);

route.post("/create",
  [verifyCarrera, validate],
  createCarrera);

route.put("/:id", updateCarrera);

route.delete("/:id", deleteCarrera);

module.exports = route;