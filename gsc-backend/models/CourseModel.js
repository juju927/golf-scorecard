const debug = require("debug")("gsc-backend:models:CourseModel");

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ratingSchema = new Schema({
  name: { type: String, required: [true, "Please specify course tee name."] },
  course: {
    full: { type: Number },
    out: { type: Number },
    in: { type: Number },
  },
  slope: {
    full: { type: Number, min: 55, max: 155 },
    out: { type: Number, min: 55, max: 155 },
    in: { type: Number, min: 55, max: 155 },
  },
});

// https://mongoosejs.com/docs/schematypes.html#maps
const courseSchema = new Schema({
  course_name: {
    type: String,
    required: [true, "Please specify the course name."],
  },
  usga_ratings: [ratingSchema],
  dist_unit: { type: String, enum: ["metres", "yards"] },
  holes: [
    {
      hole_no: { type: Number, min: 1, max: 18, required: true },
      par: { type: Number, min: 3, max: 6, required: true },
      //! to-do: validation for dist's keys
      dists: { type: Map, of: Number },
      // gold: { type: Number },
      // black: { type: Number },
      // blue: { type: Number },
      // white: { type: Number },
      // yellow: { type: Number },
      // red: { type: Number },
      // green: { type: Number },
      // },
      handicap_index: { type: Map, of: Number, min: 1, max: 18 },
      // all: { type: Number, min: 1, max: 18 },
      // gold: { type: Number, min: 1, max: 18 },
      // black: { type: Number, min: 1, max: 18 },
      // blue: { type: Number, min: 1, max: 18 },
      // white: { type: Number, min: 1, max: 18 },
      // yellow: { type: Number, min: 1, max: 18 },
      // red: { type: Number, min: 1, max: 18 },
      // green: { type: Number, min: 1, max: 18 },
      // },
    },
  ],
});

module.exports = model("Course", courseSchema);
