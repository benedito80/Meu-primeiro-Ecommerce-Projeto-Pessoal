const express = require("express");
const router = express.Router();
const ctrlUser = require("../controllers/user.controller");
const jwtHelper = require("../config/jwtHelper");

router.post("", ctrlUser.register);
router.get("", jwtHelper.verifyJwtToken, ctrlUser.userAll);
router.post("/authenticate", ctrlUser.authenticate);
router.patch("/user/:id", jwtHelper.verifyJwtToken, ctrlUser.userUpdatePost);

router.get("/user/:id", jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.put("/:id", jwtHelper.verifyJwtToken, ctrlUser.userUpdate);
router.get("/:id", jwtHelper.verifyJwtToken, ctrlUser.getById);
router.delete("/:id", jwtHelper.verifyJwtToken, ctrlUser.userDelete);

module.exports = router;
