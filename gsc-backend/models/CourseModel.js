const debug = require("debug")("gsc-backend:models:CourseModel");

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const courseSchema = new Schema({
  course_name: {
    type: String,
    required: [true, "Please specify the course name."],
  },
  course_ratings: {
    black: { type: Number },
    blue: { type: Number },
    white: { type: Number },
    yellow: { type: Number },
    red: { type: Number }
  },
  slope_rating: { type: Number, min: 55, max: 155 },
  holes: [{
    hole_no: { type: Number, min: 1, max: 18, required: true },
    par: { type: Number, min: 3, max: 6, required: true },
    dist: {
      black: { type: Number },
      blue: { type: Number },
      white: { type: Number },
      yellow: { type: Number },
      red: { type: Number }
    },
    handicap: {
      black: { type: Number },
      blue: { type: Number },
      white: { type: Number },
      yellow: { type: Number },
      red: { type: Number }
    }
    }]
  });

module.exports = model("Course", courseSchema);
