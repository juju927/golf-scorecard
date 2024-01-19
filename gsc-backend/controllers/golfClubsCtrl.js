const debug = require("debug")("gsc-backend:controllers:golfClubsCtrl");

const GolfClub = require("../models/GolfClubModel");
const sendResponse = require("../helpers/sendResponseHelper");
const golfClubLibrary = require("../seed/golfClubs/golfClubLibrary.json");

async function getGolfClubs(req, res) {
  try {
    const golfClubs = await GolfClub.find({}).sort({ serial: 1 });
    sendResponse(res, 200, { golfClubs });
  } catch (err) {
    sendResponse(res, 500, err.message);
  }
}

async function createGolfClub(req, res) {
  try {
    const newGolfClub = await GolfClub.create({
      category: req.body.category,
      name: req.body.name,
      abbrvName: req.body.abbrvName,
    });
    debug("created new golf club: %o", req.body);
    sendResponse(res, 201, { newGolfClub }, "golf club added");
  } catch (err) {
    debug("Error creating: %o", err);
    sendResponse(res, 500, err.message);
  }
}

async function seedGolfClubLibrary(req, res) {
  try {
    await GolfClub.deleteMany({});
    await GolfClub.insertMany(golfClubLibrary);
    sendResponse(res, 200);
  } catch (err) {
    sendResponse(res, 500, err.message);
  }
}

module.exports = { getGolfClubs, createGolfClub, seedGolfClubLibrary };
