const debug = require("debug")("gsc-backend:controllers:coursesCtrl");

const Course = require("../models/CourseModel");
const sendResponse = require("../helpers/sendResponseHelper")

async function create(req, res) {
  try {
    const newCourse = await Course.create(req.body);
    debug("created new course: %o", req.body);
    sendResponse(res, 201, { newCourse }, "course added");
  } catch (err) {
    debug("Error creating: %o", err);
    sendResponse(res, 500, err.message);
  }
}

module.exports = { create }