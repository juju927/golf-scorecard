const debug = require("debug")("gsc-backend:controllers:roundsCtrl");

const Round = require("../models/RoundModel");
const User = require("../models/UserModel");
const Course = require("../models/CourseModel");
const sendResponse = require("../helpers/sendResponseHelper");
const userCanAlter = require("../middleware/userCanAlter");

async function getUserRounds(req, res) {
  try {
    const rounds = await Round.find({ user: req.user._id })
      .populate("course")
      .populate({
        path: "user",
        select: "profile",
        populate: {
          path: "profile",
          select: ["profile_picture", "username", "display_name", "country"],
        },
      })
      .exec();
    sendResponse(res, 200, { rounds });
  } catch (err) {
    sendResponse(res, 500, err.message);
  }
}

async function getRound(req, res) {
  try {
    const round = await Round.findById(req.query.id)
      .populate("course")
      .populate({ path: "user", populate: { path: "profile" } })
      .exec();
    sendResponse(res, 200, { round });
  } catch (err) {
    debug("Error getting round: %o", err);
    sendResponse(res, 500, err.message);
  }
}

async function createRound(req, res) {
  try {
    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.body.course_id);
    const newRound = await Round.create({
      user: user._id, // change to token (req.user._id)
      course: course._id,
      date: req.body.date || Date.now(),
      tee: req.body.tee, // do a retrieve of tees in the course
      round_record: [...initialiseRecord(req.body.round_type)],
    });
    const round = await Round.findById(newRound._id)
      .populate("course")
      .populate({ path: "user", populate: { path: "profile" } })
      .exec();
    debug("round", round);
    sendResponse(res, 201, { round }, `round started at ${round.date}`);
  } catch (err) {
    debug("Error creating round: %o", err);
    sendResponse(res, 500, err.message);
  }
}

async function addStroke(req, res) {
  try {
    const round = await Round.findById(req.body.round_id)
      .populate("course")
      .exec();
    if (!userCanAlter(round, req.user)) {
      sendResponse(res, 401, null, "unauthorised");
      return;
    }
    // selecting a subdoc: https://mongoosejs.com/docs/subdocs.html#finding-a-subdocument
    const roundRecord = await round.round_record.id(req.body.record_id);
    if (req.body.is_penalty) {
      roundRecord.penalty_strokes++;
      roundRecord.total_strokes++;
      await round.save();
      sendResponse(res, 201, round, "penalty stroke added");
    } else {
      roundRecord.stroke_details.push({
        club: req.body.club,
        ground: req.body.ground,
        is_chip: req.body.is_chip,
        analysis: {
          direction: req.body.analysis.direction,
          distance: req.body.analysis.distance,
          remarks: req.body.analysis.remarks,
        },
      });
      roundRecord.total_strokes++;
      await round.save();
      sendResponse(res, 201, round, "stroke added");
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
  let start = 1;
  let end = 18;
  if (roundType == "front") {
    end = 9;
  } else if (roundType == "back") {
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

module.exports = { getUserRounds, getRound, createRound, addStroke };
