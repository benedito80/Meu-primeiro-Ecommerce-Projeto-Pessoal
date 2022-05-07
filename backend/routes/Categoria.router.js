const express = require("express");
const router = express.Router();
const Categoria = require("../controllers/Categoria.controller");
const jwtHelper = require("../config/jwtHelper");

router.get("", Categoria.get);
router.post("", jwtHelper.verifyJwtToken, Categoria.post);
router.get("/:id", Categoria.getById);
router.put("/:id", jwtHelper.verifyJwtToken, Categoria.put);
router.delete("/:id", jwtHelper.verifyJwtToken, Categoria.delete);
router.get("/categoria/:nome", Categoria.getCategoria);

module.exports = router;
