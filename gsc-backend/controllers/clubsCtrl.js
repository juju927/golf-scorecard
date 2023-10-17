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
    const clubs = await Club.find({})
    sendResponse(res, 201, { clubs })
  } catch (err) {
    sendResponse(res, 500, err.message)
  }
}

async function getByName(req, res) {
  try {
    const re = new RegExp(req.params.clubName, "i")
    const clubs = await Club.find({ club_name: re }).exec()
    sendResponse(res, 201, { clubs })
  } catch (err) {
    sendResponse(res, 500, err.message)
  }
}

async function getById(req, res) {
  try {
    const club = await Club.findById(req.params.id)
    sendResponse(res, 201, { club })
  } catch (err) {
    sendResponse(res, 500, err.message)
  }
}

module.exports = { create, getAll, getByName, getById }