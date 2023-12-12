const debug = require("debug")("gsc-backend:controllers:usersCtrl");

const User = require("../models/UserModel");
const UserProfile = require("../models/UserProfileModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendResponse = require("../helpers/sendResponseHelper");

async function register(req, res) {
  try {
    const newUser = await User.create(req.body);
    debug("created new user: %o", req.body);

    const newProfile = await UserProfile.create({
      username: newUser.username,
      profile_picture: "https://clipart-library.com/2023/drib6.png",
    });
    newUser.profile = newProfile._id;
    await newUser.save();
    const user = await User.findById(newUser._id).populate("profile").exec()
    const token = createJWT(user);
    sendResponse(res, 201, { token: token }, "user created");
  } catch (err) {
    debug("Error creating: %o", err);
    sendResponse(res, 500, err.message);
  }
}

async function login(req, res) {
  debug("login user body: %o", req.body);
  try {
    const user = await User.findOne({ username: req.body.username }).populate("profile").exec();
    if (user === null) {
      debug("User not found");
      throw new Error();
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      debug("Incorrect password");
      throw new Error();
    }
    const token = createJWT(user);
    sendResponse(res, 200, { token: token });
  } catch (err) {
    debug("Error logging in: %o", err);
    sendResponse(res, 401, null, "Username and password do not match.");
  }
}

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}

module.exports = { register, login };
