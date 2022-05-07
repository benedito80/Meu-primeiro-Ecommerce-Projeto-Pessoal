const express = require("express");
const router = express.Router();
const dadosPessoais = require("../controllers/dadosPessoais.controller");
const jwtHelper = require("../config/jwtHelper");

router.get("", jwtHelper.verifyJwtToken, dadosPessoais.getAll);
router.post("/:user_id", jwtHelper.verifyJwtToken, dadosPessoais.post);
router.get("/:user_id", jwtHelper.verifyJwtToken, dadosPessoais.getByUser);
router.put("/:user_id", jwtHelper.verifyJwtToken, dadosPessoais.put);
router.delete("/:user_id", jwtHelper.verifyJwtToken, dadosPessoais.delete);

module.exports = router;
