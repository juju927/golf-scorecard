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

export function getScorecardTableValues(round) {
  if (!round) {
    return;
  }
  const scorecardTableValues = {
    in: {
      played: false,
      total: {
        dist: 0,
        par: 0,
        strokes: 0,
        score: 0,
      },
      values: [],
    },
    out: {
      played: false,
      total: {
        dist: 0,
        par: 0,
        strokes: 0,
        score: 0,
      },
      values: [],
    },
    total: {
      dist: 0,
      par: 0,
      strokes: 0,
      score: 0,
    },
  };

  for (let i = 0; i < round.round_record.length; i++) {
    const courseHoleDetails = round.course.holes.filter(
      (hole) => hole.hole_no == round.round_record[i].hole_num
    )[0];
    const values = {
      hole_num: round.round_record[i].hole_num,
      dist: courseHoleDetails.dists[round.tee],
      dist_unit: round.course.dist_unit,
      index:
        courseHoleDetails.handicap_index[round.tee] ||
        courseHoleDetails.handicap_index.all,
      par: courseHoleDetails.par,
      strokes: round.round_record[i].total_strokes,
      score: round.round_record[i].total_strokes - courseHoleDetails.par,
    };
    if (values.hole_num > 9) {
      scorecardTableValues.in.played = true;
      scorecardTableValues.in.values.push(values);
      scorecardTableValues.in.total.dist += values.dist;
      scorecardTableValues.in.total.par += values.par;
      scorecardTableValues.in.total.strokes += values.strokes;
    } else {
      scorecardTableValues.out.played = true;
      scorecardTableValues.out.values.push(values);
      scorecardTableValues.out.total.dist += values.dist;
      scorecardTableValues.out.total.par += values.par;
      scorecardTableValues.out.total.strokes += values.strokes;
    }
    scorecardTableValues.total.dist += values.dist;
    scorecardTableValues.total.par += values.par;
    scorecardTableValues.total.strokes += values.strokes;
  }

  scorecardTableValues.in.total.score =
    scorecardTableValues.in.total.strokes - scorecardTableValues.in.total.par;
  scorecardTableValues.out.total.score =
    scorecardTableValues.out.total.strokes - scorecardTableValues.out.total.par;
  scorecardTableValues.total.score =
    scorecardTableValues.total.strokes - scorecardTableValues.total.par;

  return scorecardTableValues;
}
