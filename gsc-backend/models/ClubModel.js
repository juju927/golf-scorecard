const debug = require("debug")("gsc-backend:models:ClubModel");

const mongoose = require("mongoose")
const { Schema, model } = mongoose;


const clubSchema = new Schema(
  {
    club_name: { type: String, required: [true, "Please specify the club name."] },
    city: { type: String },
    country: { type: String, required: [true, "Please specify the country."] },
    address: { type: String },
    website: { type: String },
    courses: [ { type: Schema.Types.ObjectId, ref: 'Course'} ]
  }
)

module.exports = model("Club", clubSchema);