//? https://www.myonlinegolfclub.com/Information/GolfStatistics
export function getScorecardValues(roundRecord) {
  const scorecard = {};
  scorecard.profile_picture = roundRecord.user.profile.profile_picture;
  scorecard.name = roundRecord.user.profile.display_name;
  scorecard.username = roundRecord.user.profile.username;
  scorecard.country = roundRecord.user.profile.country;
  scorecard.course = roundRecord.course.course_name;
  scorecard.date = roundRecord.date;
  scorecard.tee = roundRecord.tee;

  const total_holes = roundRecord.round_record.length;

  var pars;
  if (roundRecord.round_record.length == 18) {
    pars = roundRecord.course.holes;
  } else {
    if (roundRecord.round_record[0].hole_num == 1) {
      pars = roundRecord.course.holes.slice(0, 9);
    } else {
      pars = roundRecord.course.holes.slice(9, 18);
    }
  }

  var netScore = 0;
  var GIRcount = 0;
  var FIR = {
    hit: 0,
    miss: 0,
  };
  var putts = 0;

  for (let i = 0; i < roundRecord.round_record.length; i++) {
    let hole = roundRecord.round_record[i];
    netScore += hole.total_strokes;
    hole.GIR && GIRcount++;
    if (pars[i].par >= 4) {
      hole.stroke_details[1]?.ground === "Fairway" ? FIR.hit++ : FIR.miss++;
    }
    for (let stroke of hole.stroke_details) {
      stroke.club.abbrvName === "Pt" && stroke.ground === "Green" && putts++;
    }
  }

  scorecard.netScore = netScore;
  if (roundRecord.hcp) {
    scorecard.grossScore = netScore - roundRecord.hcp;
  } else {
    scorecard.grossScore = netScore;
  }
  scorecard.GIR = ((GIRcount / total_holes) * 100).toFixed(1);
  scorecard.FIR = ((FIR.hit / (FIR.hit + FIR.miss)) * 100).toFixed(1);
  scorecard.puttsPerRound = putts;
  scorecard.puttingAverage = (putts / total_holes).toFixed(2);

  return scorecard;
}

export function analysePutts(putts) {
  switch (putts) {
    case 1:
      return "good"
    case 2:
      return "neutral"
    case 3:
      return "bad"
  }
}