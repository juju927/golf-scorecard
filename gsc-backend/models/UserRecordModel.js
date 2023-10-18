const debug = require("debug")("gsc-backend:models:UserRecordModel");

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userRecordSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  course_id: { type: Schema.Types.ObjectId, ref: "Course" },
  round_date: { type: Date, required: true, default: Date.now() },
  tee: { type: String, required: [ true, "Please specify tee colour."] }, // colour tee
  // hcp: { type: Number }, // hcp for the course
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
        required: true 
        //? how to make this count length of stroke details?
      },
      penalty_strokes: { type: Number, required: true, default: 0 },
      stroke_details: [
        {
          club: { type: String, validate: /\d[iWh]|W\d{2}|PW|Pt/, required: [true, "Please specify club used."] }, 
          ground: { type: String, enum: ['Tee-off', 'Fairway', 'Rough', 'Sand', 'Green'], required: [true, "Please specify type of ground shot from."] },
          is_chip: { type: Boolean, default: false },
          analysis: {
            is_left: { type: Boolean, default: false },
            is_right: { type: Boolean, default: false },
            is_short: { type: Boolean, default: false },
            is_long: { type: Boolean, default: false },
            remarks: { type: String }
          },
        },
      ],
    },
  ],
});

module.exports = model("UserRecord", userRecordSchema);
