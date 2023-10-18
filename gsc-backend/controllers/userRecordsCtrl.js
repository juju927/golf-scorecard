const debug = require("debug")("gsc-backend:controllers:userRecordsCtrl");

const UserRecord = require("../models/UserRecordModel");
const User = require("../models/UserModel");
const Course = require("../models/CourseModel");
const sendResponse = require("../helpers/sendResponseHelper");

async function createRound(req, res) {
  try {
    const user = await User.findById(req.body.user_id) // change to token (req.user._id)
    const course = await Course.findById(req.body.course_id)
    const newRound = await UserRecord.create({
      user_id: user._id, // change to token (req.user._id)
      course_id: course._id,
      round_date: req.body.round_date || Date.now(), 
      tee: req.body.tee, // do a retrieve of tees in the course
      round_record: []
    })
    sendResponse(res, 201, { newRound }, `round started at ${newRound.round_date}`)
  } catch (err) {
    debug("Error creating: %o", err);
    sendResponse(res, 500, err.message);
  }
}

module.exports = { createRound };
