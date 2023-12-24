const debug = require("debug")("gsc-backend:helpers:statCalculator");

function checkGIR(roundRecord, parNo) {
  // don't calculate GIR if round incomplete
  if (!roundRecord.is_completed) {
    return undefined;
  }

  var strokesBeforeGreen = 0;
  for (let stroke of roundRecord.stroke_details) {
    // if ground type is green, stop counting
    if (stroke.ground == "Green") {
      break;
    }
    // if not, add the stroke to count
    strokesBeforeGreen++;
    // and add the penalty associated with the stroke
    strokesBeforeGreen += stroke.penalty.penalty_amt || 0;
  }

  return strokesBeforeGreen <= parNo - 2;
}

function checkFIR(roundRecord, parNo) {
  // don't calculate FIR if par 3 or 2nd stroke not played
  if (parNo == 3 || roundRecord.stroke_details.length < 2) {
    return undefined;
  }

  if (
    roundRecord.stroke_details[1]?.ground == "Fairway" &&
    !(roundRecord.stroke_details[0].penalty.penalty_amt)
  ) {
    return true;
  }
  return false;
}

function checkPutts(strokeDetails) {
  var putts = 0;
  for (let stroke of strokeDetails) {
    if (stroke.club.abbrvName == "Pt" && stroke.ground == "Green") {
      putts++;
    }
  }
  return putts;
}

function countPenalties(strokeDetails) {
  var penalties = 0;
  for (let stroke of strokeDetails) {
    if (!isNaN(stroke.penalty.penalty_amt)) {
      penalties += stroke.penalty.penalty_amt;
    }
  }
  return penalties;
}

module.exports = { checkGIR, checkFIR, checkPutts, countPenalties };
