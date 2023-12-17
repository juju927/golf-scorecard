const debug = require("debug")("gsc-backend:controllers:userProfilesCtrl");

const sendResponse = require("../helpers/sendResponseHelper");
const User = require("../models/UserModel");
const UserProfile = require("../models/UserProfileModel");

async function getUserProfile(req, res) {
  try {
    const profile = await UserProfile.find({
      username: req.params.username,
    }).populate("golf_bag");
    sendResponse(res, 200, profile);
  } catch (err) {
    debug("Error getting user profile: %o", err);
    sendResponse(res, 500, err.message);
  }
}

async function createUserProfile(req, res) {
  try {
    const have = await UserProfile.exists({ username: req.user.username });
    if (have) {
      sendResponse(res, 400, "user profile already exists");
      return;
    }

    const user = await User.findById(req.user._id);
    const newProfile = await UserProfile.create({
      username: req.user.username,
      profile_picture: "https://clipart-library.com/2023/drib6.png",
    });
    user.profile = newProfile._id;
    await user.save();
    sendResponse(res, 201, newProfile, "new profile created");
  } catch (err) {
    debug("Error creating profile: %o", err);
    sendResponse(res, 500, err.message);
  }
}

async function updateUserProfile(req, res) {
  try {
    const profile = await UserProfile.findByIdAndUpdate(
      req.user.profile._id,
      req.body,
      { new: true } // this line is to return the updated document
    )
      .populate("golf_bag")
      .exec();
    sendResponse(res, 200, profile, "user profile updated");
  } catch (err) {
    debug("Error updating profile: %o", err);
    sendResponse(res, 500, err.message);
  }
}

module.exports = { getUserProfile, createUserProfile, updateUserProfile };
