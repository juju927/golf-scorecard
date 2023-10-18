const debug = require("debug")("gsc-backend:controllers:userRecordsCtrl");

const Round = require("../models/RoundModel");
const User = require("../models/UserModel");
const Course = require("../models/CourseModel");
const sendResponse = require("../helpers/sendResponseHelper");

async function getRounds(req, res) {
  try {
    const rounds = await Round.find({ ...req.query })
    sendResponse(res, 200, { rounds });
  } catch (err) {
    sendResponse(res, 500, err.message);
  }
}

async function getRound(req, res) {
  try {
    const round = await Round.findById(req.query.id);
    sendResponse(res, 200, { round });
  } catch (err) {
    debug("Error getting round: %o", err);
    sendResponse(res, 500, err.message);
  }
}

async function createRound(req, res) {
  try {
    const user = await User.findById(req.body.user_id); //! change to token (req.user._id)
    const course = await Course.findById(req.body.course_id);
    const newRound = await Round.create({
      user_id: user._id, // change to token (req.user._id)
      course_id: course._id,
      date: req.body.date || Date.now(),
      tee: req.body.tee, // do a retrieve of tees in the course
      round_record: [...initialiseRecord(req.body.round_type)],
    });
    sendResponse(
      res,
      201,
      { newRound },
      `round started at ${newRound.round_date}`
    );
  } catch (err) {
    debug("Error creating round: %o", err);
    sendResponse(res, 500, err.message);
  }
}

async function addStroke(req, res) {
  try {
    const round = await Round.findById(req.body.round_id);
    // selecting a subdoc: https://mongoosejs.com/docs/subdocs.html#finding-a-subdocument
    const roundRecord = await round.round_record.id(req.body.record_id);
    if (req.body.stroke.is_penalty) {
      roundRecord.penalty_strokes++;
      roundRecord.total_strokes++;
      await round.save();
      sendResponse(res, 201, roundRecord, "penalty stroke added");
    } else {
      roundRecord.stroke_details.push({
        club: req.body.stroke.club,
        ground: req.body.stroke.ground,
        is_chip: req.body.stroke.is_chip,
        analysis: {
          is_left: req.body.stroke.is_left || false,
          is_right: req.body.stroke.is_right || false,
          is_short: req.body.stroke.is_short || false,
          is_long: req.body.stroke.is_long || false,
          remarks: req.body.stroke.remarks || "",
        },
      });
      roundRecord.total_strokes++;
      await round.save();
      sendResponse(res, 201, roundRecord, "stroke added");
    }
  } catch (err) {
    debug("Error adding stroke: %o", err);
    sendResponse(res, 500, err.message);
  }
}

// async function editStroke(req, res) {
//   try {

//   } catch (err) {
//     debug("Error editing stroke: %o", err);
//     sendResponse(res, 500, err.message);
//   }
// }

function initialiseRecord(roundType) {
  // roundLength is 'full', 'out', or 'in'
  let start = 1;
  let end = 18;
  if (roundType == "out") {
    end = 9;
  } else if (roundType == "in") {
    start = 10;
  }

  const arr = [];

  for (let i = start; i <= end; i++) {
    arr.push({
      hole_num: i,
      total_strokes: 0,
      penalty_strokes: 0,
      stroke_details: [],
    });
  }

  return arr;
}

module.exports = { getRounds, getRound, createRound, addStroke };
