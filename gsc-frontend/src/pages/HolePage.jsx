import { useAtomValue, useSetAtom } from "jotai";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { currentRoundRecordAtom } from "../utilities/atom";
import NewStrokeForm from "../components/record/StrokeForms/NewStrokeForm";
import StrokesSummary from "../components/record/StrokesSummary";
import HoleDetails from "../components/record/HoleDetails";
import StrokeList from "../components/record/StrokeList";
import {
  addStrokeService,
  deleteStrokeService,
  updateStatsService,
} from "../utilities/rounds-service";
import toast from "react-hot-toast";

const HolePage = () => {
  const { holeNo } = useParams();
  const navigate = useNavigate();
  const roundDetails = useAtomValue(currentRoundRecordAtom);
  const setCurrentRound = useSetAtom(currentRoundRecordAtom);

  // these 2 useState are cos idk how to derive from atom, but they are derived (refer to useEffect)
  // holeDetails - of golf course/ fixed
  // strokeDetails - of user plays
  const [holeDetails, setHoleDetails] = useState({});
  const [strokeDetails, setStrokeDetails] = useState({});

  // toggle form
  const [showAddStroke, setShowAddStroke] = useState(false);

  // calculations for Links
  const firstHole = roundDetails.round_record?.[0].hole_num;
  const lastHole =
    roundDetails.round_record?.[roundDetails.round_record.length - 1].hole_num;
  const prevHole = holeNo == firstHole ? holeNo : parseInt(holeNo) - 1;
  const nextHole = holeNo == lastHole ? holeNo : parseInt(holeNo) + 1;

  const addPenalty = async () => {
    try {
      const updatedRound = await addStrokeService({
        round_id: roundDetails?._id,
        round_record_id: strokeDetails?._id,
        is_penalty: true,
      });
      setCurrentRound(updatedRound);
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  const removePenalty = async () => {
    try {
      const updatedRound = await deleteStrokeService({
        round_id: roundDetails?._id,
        round_record_id: strokeDetails?._id,
        is_penalty: true,
      });
      setCurrentRound(updatedRound);
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  const endRound = async () => {
    try {
      const updatedRound = await updateStatsService({
        round_id: roundDetails?._id,
        round_record_id: strokeDetails?._id,
        par_no: holeDetails?.par,
        is_completed: true,
      });
      setCurrentRound(updatedRound);
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  const goToScorecard = () => {
    navigate(`/analyse/s/${roundDetails._id}`);
  };

  useEffect(() => {
    if (
      parseInt(holeNo) < parseInt(firstHole) ||
      parseInt(holeNo) > parseInt(lastHole)
    ) {
      navigate(`/record/hole/${firstHole}`);
    }
    setHoleDetails(
      roundDetails?.course?.holes.filter((hole) => hole.hole_no == holeNo)[0]
    );
    setStrokeDetails(
      roundDetails?.round_record?.filter((hole) => hole.hole_num == holeNo)[0]
    );
  }, [roundDetails, holeNo]);

  useEffect(() => {
    if (Object.keys(roundDetails).length == 0) {
      navigate(`/record/rounds`);
    }
  }, [roundDetails]);

  return (
    <div className="hole-page-outlet w-full h-full bg-gray-900 flex flex-col">
      <HoleDetails
        prevHole={prevHole}
        nextHole={nextHole}
        hole_no={holeDetails?.hole_no}
        par_no={holeDetails?.par}
        dist={holeDetails?.dists?.[roundDetails.tee]}
        dist_unit={roundDetails?.course?.dist_unit}
        index_no={
          holeDetails?.handicap_index?.[roundDetails.tee] ||
          holeDetails?.handicap_index?.all
        }
        goToScorecard={goToScorecard}
      />

      <StrokesSummary
        strokeDetails={strokeDetails}
        par_no={holeDetails?.par}
      />

      <div className="grow overflow-y-auto">
        <StrokeList
          strokeDetails={strokeDetails}
          round_id={roundDetails?._id}
        />

        {showAddStroke ? (
          <NewStrokeForm
            roundId={roundDetails?._id}
            recordId={strokeDetails?._id}
            total_strokes={strokeDetails?.total_strokes}
            setShowAddStroke={setShowAddStroke}
            endRound={endRound}
          />
        ) : (
          <div
            className="mx-4 my-2 px-4 h-12 rounded-lg bg-teal-500 flex justify-center items-center shadow-md shadow-teal-500/50"
            onClick={() => setShowAddStroke(true)}
          >
            <p className="uppercase font-medium text-white tracking-tight">
              add new stroke
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HolePage;
