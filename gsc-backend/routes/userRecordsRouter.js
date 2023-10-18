const debug = require("debug")("gsc-backend:routes:userRecordsRouter");

const express = require("express");
const router = express.Router();
const userRecordsCtrl = require("../controllers/userRecordsCtrl");

router.post("/round", userRecordsCtrl.createRound);
router.post("/round/stroke", userRecordsCtrl.addStroke);


module.exports = router;
