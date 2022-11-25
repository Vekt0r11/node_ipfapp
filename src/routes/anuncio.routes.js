const route = require("express").Router();
const { verifyAnuncio } = require('../middlewares/anuncio.middleware')
const { validate } = require('../util/validate')

const { getAnuncio, getAnuncios, createAnuncio, updateAnuncio, deleteAnuncio, getAnunciosEstudiante } = require("../controllers/anuncio.controllers");

route.get("/", getAnuncios);
route.get("/propio/:id", getAnunciosEstudiante);
route.get("/:id", getAnuncio);

route.post("/create",
  [verifyAnuncio, validate],
  createAnuncio);

route.put("/", updateAnuncio);

route.delete("/:id", deleteAnuncio);

module.exports = route;