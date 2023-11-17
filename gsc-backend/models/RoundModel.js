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
          required: true,
        },
        penalty_strokes: { type: Number, required: true, default: 0 },
        GIR: { type: Boolean, default: false },
        stroke_details: [
          {
            club: {
              serial: {
                type: Number,
                min: 0,
                max: 34,
                required: true,
              },
              category: {
                type: String,
                enum: ["Woods", "Hybrids", "Irons", "Wedges", "Putters"],
                required: true,
              },
              name: { type: String },
              abbrvName: { type: String, validate: /\d[iWh]|W\d{2}|PW|SW|Pt/ },
            },
            ground: {
              type: String,
              enum: ["Tee-off", "Fairway", "Rough", "Sand", "Green"],
              required: [true, "Please specify type of ground shot from."],
            },
            is_chip: { type: Boolean, default: false },
            analysis: {
              direction: { type: String, enum: ["left", "straight", "right"] },
              distance: { type: String, enum: ["short", "average", "long"] },
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
