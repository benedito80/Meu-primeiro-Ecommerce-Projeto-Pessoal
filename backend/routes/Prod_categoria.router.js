const express = require("express");
const router = express.Router();
const prod_categoria = require("../controllers/Prod_categoria.controller");
const jwtHelper = require("../config/jwtHelper");

router.get("", prod_categoria.get);
router.post("", jwtHelper.verifyJwtToken, prod_categoria.post);
router.put("/:id", jwtHelper.verifyJwtToken, prod_categoria.put);
router.delete("/:id", jwtHelper.verifyJwtToken, prod_categoria.delete);
router.get("/:id", prod_categoria.getById);
router.get("/categoria-product/:nome", prod_categoria.getProd_categoria);

module.exports = router;
