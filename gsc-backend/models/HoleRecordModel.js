const debug = require("debug")("gsc-backend:models:HoleRecordModel");

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const holeRecordSchema = new Schema(
  {
    hole_num: {
      type: Number,
      required: [true, "Please specify hole number."],
      min: 1,
      max: 18,
    },
    total_strokes: {
      type: Number,
      required: true,
    },
    penalty_strokes: { type: Number, required: true, default: 0 },
    FIR: { type: Boolean },
    GIR: { type: Boolean },
  }
)