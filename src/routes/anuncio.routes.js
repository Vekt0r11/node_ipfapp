const route = require("express").Router();
const { verifyAnuncio } = require('../middlewares/anuncio.middleware')
const { validate } = require('../util/validate')

const { getAnuncio, getAnuncios, createAnuncio, updateAnuncio, deleteAnuncio } = require("../controllers/anuncio.controllers");

route.get("/", getAnuncios);
route.get("/:id", getAnuncio);

route.post("/create",
  [verifyAnuncio, validate],
  createAnuncio);

route.put("/:id", updateAnuncio);

route.delete("/:id", deleteAnuncio);

module.exports = route;