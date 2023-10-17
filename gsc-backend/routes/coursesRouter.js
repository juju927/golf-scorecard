const debug = require("debug")("gsc-backend:routes:coursesRouter");

const express = require("express");
const router = express.Router();
const coursesCtrl = require("../controllers/coursesCtrl");
const { body, validationResult } = require("express-validator");

router.get("/", (req, res, next) => {res.json({ "msg": "courseseseses"})})
router.post("/create", coursesCtrl.create);

module.exports = router;
