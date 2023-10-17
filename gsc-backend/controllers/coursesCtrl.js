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

async function getAll(req, res) {
  try {
    const courses = await Course.find({})
    sendResponse(res, 201, { courses })
  } catch (err) {
    sendResponse(res, 500, err.message)
  }
}

async function getByName(req, res) {
  try {
    const re = new RegExp(req.params.courseName, "i")
    const courses = await Course.find({ course_name: re }).exec()
    sendResponse(res, 201, { courses })
  } catch (err) {
    sendResponse(res, 500, err.message)
  }
}

module.exports = { create, getAll, getByName }