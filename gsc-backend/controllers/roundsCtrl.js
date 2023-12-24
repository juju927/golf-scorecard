const debug = require("debug")("gsc-backend:controllers:roundsCtrl");

const Round = require("../models/RoundModel");
const User = require("../models/UserModel");
const Course = require("../models/CourseModel");
const sendResponse = require("../helpers/sendResponseHelper");
const userCanAlter = require("../helpers/userCanAlter");
const {
  checkGIR,
  checkFIR,
  checkPutts,
  countPenalties,
} = require("../helpers/statCalculator");

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
      .populate({
        path: "round_record",
        populate: { path: "stroke_details", populate: { path: "club" } },
      })
      .sort({ date: -1 })
      .limit(10)
      .exec();

    sendResponse(res, 200, { rounds });
  } catch (err) {
    debug(err);
    sendResponse(res, 500, err.message);
  }
}

async function getRound(req, res) {
  try {
    const round = await Round.findById(req.query.id)
      .populate("course")
      .populate({ path: "user", populate: { path: "profile" } })
      .populate({
        path: "round_record",
        populate: { path: "stroke_details", populate: { path: "club" } },
      })
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
      user: user._id,
      course: course._id,
      date: Date.now(),
      tee: req.body.tee,
      round_record: [...initialiseRecord(req.body.round_type)],
    });
    const round = await Round.findById(newRound._id)
      .populate("course")
      .populate({ path: "user", populate: { path: "profile" } })
      .populate({
        path: "round_record",
        populate: { path: "stroke_details", populate: { path: "club" } },
      })
      .exec();
    debug("round", round);
    sendResponse(res, 201, { round }, `round started at ${round.date}`);
  } catch (err) {
    debug("Error creating round: %o", err);
    sendResponse(res, 500, err.message);
  }
}

async function deleteRound(req, res) {
  try {
    const round = await Round.findById(req.body.round_id);
    if (!userCanAlter(round.user, req.user)) {
      sendResponse(res, 401, null, "unauthorised");
      return;
    }
    await round.deleteOne();
    sendResponse(res, 200, "round deleted");
  } catch (err) {
    debug("Error deleting round: %o", err);
    sendResponse(res, 500, err.message);
  }
}

async function updateRoundRecord(req, res) {
  try {
    const round = await Round.findById(req.body.round_id)
      .populate("course")
      .populate({
        path: "round_record",
        populate: { path: "stroke_details", populate: { path: "club" } },
      })
      .exec();
    if (!userCanAlter(round.user, req.user)) {
      sendResponse(res, 401, null, "unauthorised");
      return;
    }
    const roundRecord = round.round_record.id(req.body.round_record_id);
    roundRecord.is_completed = req.body.is_completed;
    calculateStats(round, roundRecord);
    await round.save();
    sendResponse(res, 200, round, "round edited");
  } catch (err) {
    debug("Error editing round: %o", err);
  }
}

async function addStroke(req, res) {
  try {
    const round = await Round.findById(req.body.round_id)
      .populate("course")
      .populate({
        path: "round_record",
        populate: { path: "stroke_details", populate: { path: "club" } },
      })
      .exec();
    if (!userCanAlter(round.user, req.user)) {
      sendResponse(res, 401, null, "unauthorised");
      return;
    }
    // selecting a subdoc: https://mongoosejs.com/docs/subdocs.html#finding-a-subdocument
    const roundRecord = await round.round_record.id(req.body.round_record_id);
    roundRecord.stroke_details.push({
      club: req.body.club,
      ground: req.body.ground,
      is_chip: req.body.is_chip,
      penalty: req.body.penalty,
      analysis: req.body.analysis,
    });
    calculateStats(round, roundRecord);
    await round.save();
    sendResponse(res, 201, round, "stroke added");
  } catch (err) {
    debug("Error adding stroke: %o", err);
    sendResponse(res, 500, err.message);
  }
}

async function editStroke(req, res) {
  try {
    const round = await Round.findById(req.body.round_id)
      .populate("course")
      .populate({
        path: "round_record",
        populate: { path: "stroke_details", populate: { path: "club" } },
      })
      .exec();
    if (!userCanAlter(round.user, req.user)) {
      sendResponse(res, 401, null, "unauthorised");
      return;
    }
    const roundRecord = round.round_record.id(req.body.round_record_id);
    const stroke = roundRecord.stroke_details.id(req.body.stroke_id);
    stroke.club = req.body.club || stroke.club;
    stroke.ground = req.body.ground || stroke.ground;
    stroke.is_chip = req.body.is_chip || stroke.is_chip;
    stroke.penalty = req.body.penalty || stroke.penalty;
    stroke.analysis.direction =
      req.body.analysis.direction || stroke.analysis.direction;
    stroke.analysis.distance =
      req.body.analysis.distance || stroke.analysis.distance;
    stroke.analysis.remarks =
      req.body.analysis.remarks || stroke.analysis.remarks;

    calculateStats(round, roundRecord);
    await round.save();
    sendResponse(res, 200, round, "stroke edited");
  } catch (err) {
    debug("Error editing stroke: %o", err);
    sendResponse(res, 500, err.message);
  }
}

async function deleteStroke(req, res) {
  try {
    const round = await Round.findById(req.body.round_id)
      .populate("course")
      .populate({
        path: "round_record",
        populate: { path: "stroke_details", populate: { path: "club" } },
      })
      .exec();
    if (!userCanAlter(round.user, req.user)) {
      sendResponse(res, 401, null, "unauthorised");
      return;
    }
    const roundRecord = round.round_record.id(req.body.round_record_id);
    roundRecord.stroke_details.id(req.body.stroke_id).deleteOne();
    calculateStats(round, roundRecord);
    await round.save();
    sendResponse(res, 200, round, "stroke deleted");
  } catch (err) {
    debug("Error deleting stroke: %o", err);
    sendResponse(res, 500, err.message);
  }
}

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
      is_completed: false,
      stroke_details: [],
    });
  }

  return arr;
}

function getParNo(round, roundRecord) {
  const hole_num = roundRecord.hole_num;
  return round.course.holes.filter((hole) => hole.hole_no == hole_num)[0].par;
}

function calculateStats(round, roundRecord) {
  roundRecord.GIR = checkGIR(roundRecord, getParNo(round, roundRecord));
  roundRecord.FIR = checkFIR(roundRecord, getParNo(round, roundRecord));
  roundRecord.putts = checkPutts(roundRecord.stroke_details);
  roundRecord.penalty_strokes = countPenalties(roundRecord.stroke_details);
  roundRecord.total_strokes =
    roundRecord.penalty_strokes + roundRecord.stroke_details.length;
}

module.exports = {
  getUserRounds,
  getRound,
  createRound,
  deleteRound,
  updateRoundRecord,
  addStroke,
  editStroke,
  deleteStroke,
};
