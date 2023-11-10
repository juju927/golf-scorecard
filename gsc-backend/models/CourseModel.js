const debug = require("debug")("gsc-backend:models:CourseModel");

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ratingSchema = new Schema({
  name: { type: String, required: [true, "Please specify course tee name."] },
  course: {
    full: { type: Number },
    front: { type: Number },
    back: { type: Number },
  },
  slope: {
    full: { type: Number, min: 55, max: 155 },
    front: { type: Number, min: 55, max: 155 },
    back: { type: Number, min: 55, max: 155 },
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
      handicap_index: { type: Map, of: Number, min: 1, max: 18 },
    },
  ],
});

module.exports = model("Course", courseSchema);
