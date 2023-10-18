const debug = require("debug")("gsc-backend:controllers:userRecordsCtrl");

const UserRecord = require("../models/UserRecordModel");
const User = require("../models/UserModel");
const Course = require("../models/CourseModel");
const sendResponse = require("../helpers/sendResponseHelper");

async function createRound(req, res) {
  try {
    const user = await User.findById(req.body.user_id) //! change to token (req.user._id)
    const course = await Course.findById(req.body.course_id)
    const newRound = await UserRecord.create({
      user_id: user._id, // change to token (req.user._id)
      course_id: course._id,
      round_date: req.body.round_date || Date.now(), 
      tee: req.body.tee, // do a retrieve of tees in the course
      round_record: [...initialiseRecord(req.body.round_type)]
    })
    sendResponse(res, 201, { newRound }, `round started at ${newRound.round_date}`)
  } catch (err) {
    debug("Error creating: %o", err);
    sendResponse(res, 500, err.message);
  }
}

// async function addStroke(req, res) {
//   const round = await UserRecord.findById(req.body.round_id)
//   round.round_
// }

function initialiseRecord(roundType) {
  // roundLength is 'full', 'out', or 'in'
  let start = 1
  let end = 18
  if (roundType == 'out') {
    end = 9
  } else if (roundType == 'in') {
    start = 10
  }

  const arr = []

  for (let i=start; i<=end; i++) {
    arr.push({
      hole_num: i,
      total_strokes: 0,
      penalty_strokes: 0,
      stroke_details: []
    })
  }

  return arr
}


module.exports = { createRound };
