const debug = require("debug")("gsc-backend:models:GolfClubModel");

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const golfClubSchema = new Schema({
  category: {
    type: String,
    enum: ["Woods", "Hybrids", "Irons", "Wedges", "Putters"],
    required: true,
  },
  name: { type: String },
  abbrvName: { type: String, validate: /\d[iIwWhH]|W\d{2}|[A-Z]W|Pt/ },
  serial: {
    type: Number,
  },
});

module.exports = model("GolfClub", golfClubSchema);
