function checkGIR(strokeDetails, parNo) {
  if (strokeDetails.length <= parNo - 2) {
    // if hole in less than green in reg. check
    return true;
  }
  if (strokeDetails[parNo - 2]?.ground == "Green") {
    // this is the (par-1)th stroke
    return true;
  }
  return false;
}

function checkFIR(strokeDetails, parNo) {
  if (parNo == 3) {
    return undefined;
  }
  if (strokeDetails[1]?.ground == "Fairway") {
    return true;
  }
  return false;
}

function checkPutts(strokeDetails) {
  var putts = 0;
  for (let stroke of strokeDetails) {
    console.log(stroke)
    if (stroke.club.abbrvName == "Pt" && stroke.ground == "Green") {
      putts++;
    }
  }
  return putts;
}

module.exports = { checkGIR, checkFIR, checkPutts}