const debug = require("debug")("gsc-backend:models:CourseModel");

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const courseSchema = new Schema({
  course_name: {
    type: String,
    required: [true, "Please specify the course name."],
  },
  course_ratings: {
    gold: {
      full: { type: Number },
      out: { type: Number },
      in: { type: Number },
    },
    black: {
      full: { type: Number },
      out: { type: Number },
      in: { type: Number },
    },
    blue: {
      full: { type: Number },
      out: { type: Number },
      in: { type: Number },
    },
    white: {
      full: { type: Number },
      out: { type: Number },
      in: { type: Number },
    },
    ladies_white: {
      full: { type: Number },
      out: { type: Number },
      in: { type: Number },
    },
    yellow: {
      full: { type: Number },
      out: { type: Number },
      in: { type: Number },
    },
    snr_jnr_red: {
      full: { type: Number },
      out: { type: Number },
      in: { type: Number },
    },
    red: {
      full: { type: Number },
      out: { type: Number },
      in: { type: Number },
    },
    green: {
      full: { type: Number },
      out: { type: Number },
      in: { type: Number },
    },
  },
  slope_ratings: {
    gold: {
      full: { type: Number, min: 55, max: 155 },
      out: { type: Number, min: 55, max: 155 },
      in: { type: Number, min: 55, max: 155 },
    },
    black: {
      full: { type: Number, min: 55, max: 155 },
      out: { type: Number, min: 55, max: 155 },
      in: { type: Number, min: 55, max: 155 },
    },
    blue: {
      full: { type: Number, min: 55, max: 155 },
      out: { type: Number, min: 55, max: 155 },
      in: { type: Number, min: 55, max: 155 },
    },
    white: {
      full: { type: Number, min: 55, max: 155 },
      out: { type: Number, min: 55, max: 155 },
      in: { type: Number, min: 55, max: 155 },
    },
    ladies_white: {
      full: { type: Number, min: 55, max: 155 },
      out: { type: Number, min: 55, max: 155 },
      in: { type: Number, min: 55, max: 155 },
    },
    yellow: {
      full: { type: Number, min: 55, max: 155 },
      out: { type: Number, min: 55, max: 155 },
      in: { type: Number, min: 55, max: 155 },
    },
    snr_jnr_red: {
      full: { type: Number, min: 55, max: 155 },
      out: { type: Number, min: 55, max: 155 },
      in: { type: Number, min: 55, max: 155 },
    },
    red: {
      full: { type: Number, min: 55, max: 155 },
      out: { type: Number, min: 55, max: 155 },
      in: { type: Number, min: 55, max: 155 },
    },
    green: {
      full: { type: Number, min: 55, max: 155 },
      out: { type: Number, min: 55, max: 155 },
      in: { type: Number, min: 55, max: 155 },
    },
  },
  dist_unit: { type: String, enum: ['metres', 'yards']},
  holes: [
    {
      hole_no: { type: Number, min: 1, max: 18, required: true },
      par: { type: Number, min: 3, max: 6, required: true },
      dist: {
        gold: { type: Number },
        black: { type: Number },
        blue: { type: Number },
        white: { type: Number },
        yellow: { type: Number },
        red: { type: Number },
        green: { type: Number },
      },
      handicap_index: {
        all: { type: Number, min: 1, max: 18 },
        gold: { type: Number, min: 1, max: 18 },
        black: { type: Number, min: 1, max: 18 },
        blue: { type: Number, min: 1, max: 18 },
        white: { type: Number, min: 1, max: 18 },
        yellow: { type: Number, min: 1, max: 18 },
        red: { type: Number, min: 1, max: 18 },
        green: { type: Number, min: 1, max: 18 },
      },
    },
  ],
});

module.exports = model("Course", courseSchema);
