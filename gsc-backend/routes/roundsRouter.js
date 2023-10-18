const debug = require("debug")("gsc-backend:routes:userRecordsRouter");

const express = require("express");
const router = express.Router();
const userRecordsCtrl = require("../controllers/roundsCtrl");


router.get("/round", userRecordsCtrl.getRound);
router.post("/", userRecordsCtrl.createRound);
router.post("/record/stroke", userRecordsCtrl.addStroke);



module.exports = router;
