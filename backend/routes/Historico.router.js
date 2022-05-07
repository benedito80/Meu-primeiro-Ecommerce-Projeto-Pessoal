const express = require("express");
const router = express.Router();
const historico = require("../controllers/historico.controller");
const jwtHelper = require("../config/jwtHelper");

router.get("", jwtHelper.verifyJwtToken, historico.getAll);
router.get("/true", jwtHelper.verifyJwtToken, historico.getTrue);
router.get("/:id", jwtHelper.verifyJwtToken, historico.getById);
router.post("/:user_id", jwtHelper.verifyJwtToken, historico.post);
router.put("/:id", jwtHelper.verifyJwtToken, historico.put);
router.delete("/:id", jwtHelper.verifyJwtToken, historico.delete);

module.exports = router;
