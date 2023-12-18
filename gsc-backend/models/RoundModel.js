const debug = require("debug")("gsc-backend:models:RoundModel");

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const roundSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    date: { type: Date, required: true, default: Date.now() },
    tee: { type: String, required: [true, "Please specify tee colour."] }, // colour tee
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
        },
        penalty_strokes: { type: Number, required: true },
        GIR: { type: Boolean },
        FIR: { type: Boolean },
        putts: { type: Number },
        is_completed: { type: Boolean, default: false, required: true },
        stroke_details: [
          {
            club: { type: Schema.Types.ObjectId, ref: "GolfClub" },
            ground: {
              type: String,
              enum: ["Tee-off", "Fairway", "Rough", "Sand", "Green"],
              required: [true, "Please specify type of ground shot from."],
            },
            is_chip: { type: Boolean, default: false },
            penalty: {
              penalty_type: { type: String },
              penalty_amt: { type: Number },
            },
            analysis: {
              direction: {
                type: String,
                enum: ["left", "straight", "right", "NA"],
              },
              distance: {
                type: String,
                enum: ["short", "average", "long", "NA"],
              },
              remarks: { type: String },
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("Round", roundSchema);
