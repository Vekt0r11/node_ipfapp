const route = require("express").Router();
const {
  getAnuncio,
  getAnuncios,
  createAnuncio,
  updateAnuncio,
  deleteAnuncio
} = require("../controllers/anuncio.controllers");

route.get("/", getAnuncios); //
route.get("/:id", getAnuncio); //

route.post("/create", createAnuncio); //

route.put("/:id", updateAnuncio); //

route.delete("/:id", deleteAnuncio);//

module.exports = route;