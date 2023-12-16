const debug = require("debug")("gsc-backend:routes:roundsRouter");

const express = require("express");
const router = express.Router();
const roundsCtrl = require("../controllers/roundsCtrl");

router.get("/", roundsCtrl.getUserRounds);
router.get("/round", roundsCtrl.getRound);
router.post("/", roundsCtrl.createRound);
router.delete("/", roundsCtrl.deleteRound);

router.patch("/record", roundsCtrl.updateRoundRecord);
router.post("/record/stroke", roundsCtrl.addStroke);
router.put("/record/stroke", roundsCtrl.editStroke);
router.delete("/record/stroke", roundsCtrl.deleteStroke); // req.body: roundrec, round, stroke

module.exports = router;
