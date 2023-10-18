const debug = require("debug")("gsc-backend:models:UserRecordModel");

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userRecordSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  course_id: { type: Schema.Types.ObjectId, ref: "Course" },
  round_date: { type: Date, required: true, default: Date.now },
  round_record: [
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
        default: stroke_details.length, // ?
      },
      penalty_strokes: { type: Number, required: true, default: 0 },
      stroke_details: [
        {
          club: { type: String, validate: /\d[iW]|W\d{2}|PW|Putter/ },
          type: {
            type: String,
            enum: ["Tee-off", "Fairway", "Chip", "Sand", "Putt"],
          },
          analysis: {
            left: { type: Boolean, default: false },
            right: { type: Boolean, default: false },
            short: { type: Boolean, default: false },
            long: { type: Boolean, default: false },
          },
        },
      ],
    },
  ],
});

module.exports = model("UserRecord", userRecordSchema);
