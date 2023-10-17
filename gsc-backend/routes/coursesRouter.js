const debug = require("debug")("gsc-backend:routes:coursesRouter");

const express = require("express");
const router = express.Router();
const coursesCtrl = require("../controllers/coursesCtrl");
const { body, validationResult } = require("express-validator");

router.get("/", coursesCtrl.getAll);
router.get("/:courseName", coursesCtrl.getByName);
router.post("/", coursesCtrl.create);


module.exports = router;
