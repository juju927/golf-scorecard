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
      serial: {
        type: Number,
        min: 0,
        max: 34,
        required: true,
        unique: [true, "club already in bag"],
      },
      category: {
        type: String,
        enum: ["Woods", "Hybrids", "Irons", "Wedges", "Putters"],
        required: true,
      },
      name: { type: String },
      abbrvName: { type: String, validate: /\d[iWh]|W\d{2}|PW|SW|Pt/ },
    },
  ],
  handicap: { type: Number, min: 0, max: 53 },
});

module.exports = model("UserProfile", userProfileSchema);
