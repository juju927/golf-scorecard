const debug = require("debug")("gsc-backend:routes:usersRouter");

const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/usersCtrl");
const { body, validationResult } = require("express-validator");

router.get("/", (req, res, next) => {res.json({ "msg": "ya"})})
router.post("/create", usersCtrl.create);

module.exports = router;
