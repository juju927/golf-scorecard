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

  var holesPlayed = 0;
  var netScore = 0;
  var GIRcount = 0;
  var FIR = {
    hit: 0,
    miss: 0,
  };
  var totalPutts = 0;
  var roundComplete = true;

  for (let i = 0; i < roundRecord.round_record.length; i++) {
    let hole = roundRecord.round_record[i];

    if (!hole.is_completed) {
      roundComplete = false;
      continue;
    }
    netScore += hole.total_strokes;
    hole.GIR && GIRcount++;
    hole.FIR == true && FIR.hit++;
    hole.FIR == false && FIR.miss++;
    totalPutts += hole.putts;
    holesPlayed++;
  }

  scorecard.roundComplete = roundComplete;
  scorecard.holesPlayed = holesPlayed;
  scorecard.netScore = netScore;
  if (roundRecord.hcp) {
    scorecard.grossScore = netScore - roundRecord.hcp;
  } else {
    scorecard.grossScore = netScore;
  }
  scorecard.GIR = ((GIRcount / holesPlayed) * 100).toFixed(1);
  scorecard.FIR = ((FIR.hit / (FIR.hit + FIR.miss)) * 100).toFixed(1);
  scorecard.puttsPerRound = totalPutts;
  scorecard.puttingAverage = (totalPutts / holesPlayed).toFixed(2);

  return scorecard;
}

export function analysePutts(putts) {
  switch (putts) {
    case 1:
      return "good";
    case 2:
      return "neutral";
    case 3:
      return "bad";
  }
}
