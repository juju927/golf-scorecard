const debug = require("debug")("gsc-backend:models:UserProfileModel");

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userProfileSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "profile already exists"],
  },
  profile_picture: { type: String },
  display_name: { type: String },
  country: { type: String },
  golf_bag: [
    {
      golfClub_id: { type: Schema.Types.ObjectId, ref: "GolfClub" },
      distance: { type: Number, default: 0 },
    },
  ],
  handicap: { type: Number, min: 0, max: 53 },
});

module.exports = model("UserProfile", userProfileSchema);
