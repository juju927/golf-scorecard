const debug = require("debug")("gsc-backend:routes:userRecordsRouter");

const express = require("express");
const router = express.Router();
const roundsCtrl = require("../controllers/roundsCtrl");


router.get("/", roundsCtrl.getRounds)
router.get("/round", roundsCtrl.getRound);
router.post("/", roundsCtrl.createRound);
router.post("/record/stroke", roundsCtrl.addStroke);



module.exports = router;
