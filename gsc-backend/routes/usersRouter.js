const debug = require("debug")("gsc-backend:routes:usersRouter");

const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/usersCtrl");
const { body, validationResult } = require("express-validator");
const checkToken = require("../middleware/checkToken");

router.get("/", checkToken)
router.post("/register", usersCtrl.register);
router.post("/login", usersCtrl.login);


module.exports = router;
