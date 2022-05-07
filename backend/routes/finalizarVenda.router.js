const express = require("express");
const router = express.Router();
const finalizarVenda = require("../controllers/finalizarVenda.controller");
const jwtHelper = require("../config/jwtHelper");

router.get("", jwtHelper.verifyJwtToken, finalizarVenda.getTodasVenda);

router.get(
  "/vendas/enviadas/entregues/invalidas",
  jwtHelper.verifyJwtToken,
  finalizarVenda.getVendaRuim
);

router.get(
  "/enviado/true",
  jwtHelper.verifyJwtToken,
  finalizarVenda.getAllEnviadoTrue
);

router.get(
  "/venda/entrega/true/",
  jwtHelper.verifyJwtToken,
  finalizarVenda.getAllEntregaTrue
);
router.get(
  "/venda/entrega/true/:user_id",
  jwtHelper.verifyJwtToken,
  finalizarVenda.getEntregaTrue
);
router.get(
  "/all/vendas/user/finalizadas/:user_id",
  jwtHelper.verifyJwtToken,
  finalizarVenda.geVendasUser
);

router.post("/:user_id", jwtHelper.verifyJwtToken, finalizarVenda.post);
router.put("/:finalizarVenda_id", jwtHelper.verifyJwtToken, finalizarVenda.put);
router.get("/venda/:id", jwtHelper.verifyJwtToken, finalizarVenda.getById);

router.delete(
  "/:finalizarVenda_id",
  jwtHelper.verifyJwtToken,
  finalizarVenda.delete
);

router.get(
  "/enviado/false/:user_id",
  jwtHelper.verifyJwtToken,
  finalizarVenda.getAllEnviadoFalse
);

module.exports = router;
