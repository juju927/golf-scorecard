const debug = require("debug")("gsc-backend:routes:golfClubsRouter");

const express = require("express");
const router = express.Router();
const golfClubsCtrl = require("../controllers/golfClubsCtrl");


router.get("/", golfClubsCtrl.getGolfClubs)
router.post("/", golfClubsCtrl.createGolfClub)
router.post("/seed", golfClubsCtrl.seedGolfClubLibrary)

module.exports = router;
