const debug = require("debug")("gsc-backend:controllers:clubsCtrl");

const Club = require("../models/ClubModel");
const sendResponse = require("../helpers/sendResponseHelper")

async function create(req, res) {
  try {
    const newClub = await Club.create(req.body);
    debug("created new club: %o", req.body);
    sendResponse(res, 201, { newClub }, "club added");
  } catch (err) {
    debug("Error creating: %o", err);
    sendResponse(res, 500, err.message);
  }
}

async function getAll(req, res) {
  try {
    debug(req.query)
    const clubs = await Club.find({})
    sendResponse(res, 200, { clubs })
  } catch (err) {
    sendResponse(res, 500, err.message)
  }
}

async function getByQuery(req, res) {
  try {
    if (req.query.id) {
      const club = await Club.findById(req.query.id)
      sendResponse(res, 200, { club })
    } else if (req.query.name) {
      const re = new RegExp(req.query.name, "i")
      const clubs = await Club.find({ club_name: re }).exec()
      sendResponse(res, 200, { clubs })
    }
  } catch (err) {
    sendResponse(res, 500, err.message)
  }
}

module.exports = { create, getAll, getByQuery }