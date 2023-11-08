const debug = require("debug")("gsc-backend:routes:userProfilesRouter");

const express = require("express");
const router = express.Router();
const userProfilesCtrl = require("../controllers/userProfilesCtrl");

router.get("/:username", userProfilesCtrl.getUserProfile)
router.post("/", userProfilesCtrl.createUserProfile)
router.patch("/", userProfilesCtrl.updateUserProfile)

module.exports = router;