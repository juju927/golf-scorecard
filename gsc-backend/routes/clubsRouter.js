const debug = require("debug")("gsc-backend:routes:clubsRouter");

const express = require("express");
const router = express.Router();
const clubsCtrl = require("../controllers/clubsCtrl");

router.get("/", clubsCtrl.getAll);
router.get("/:clubName", clubsCtrl.getByName);
router.get("/:id", clubsCtrl.getById);
router.post("/", clubsCtrl.create);




module.exports = router;
