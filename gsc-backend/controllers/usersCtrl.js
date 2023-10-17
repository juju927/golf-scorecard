const debug = require("debug")("gsc-backend:controllers:usersCtrl")

const User = require("../models/UserModel")
const jwt = require("jsonwebtoken");
const sendResponse = require("../helpers/sendResponseHelper")


async function create(req, res) {
  try {
    const newUser = await User.create(req.body);
    debug("created new user: %o", req.body);
    const token = createJWT(newUser);
    sendResponse(res, 201, { token: token }, "user created");
  } catch (err) {
    debug("Error creating: %o", err);
    sendResponse(res, 500, err.message);
  }
}

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}

module.exports = { create };