const express = require("express");
const router = express.Router();
const product = require("../controllers/Product.controller");
const jwtHelper = require("../config/jwtHelper");

router.get("", product.get);
router.get("/get/product/:productname", product.getProductNome);
router.get("/categoria/:categoria", product.getCategoria);
router.get("/desativado", jwtHelper.verifyJwtToken, product.getDesativado);
router.post("/:post_id", jwtHelper.verifyJwtToken, product.post);
router.get("/:product_id", jwtHelper.verifyJwtToken, product.getByIdProduct);
router.put("/:product_id", jwtHelper.verifyJwtToken, product.put);
router.delete("/user/:product_id", jwtHelper.verifyJwtToken, product.delete);

module.exports = router;
