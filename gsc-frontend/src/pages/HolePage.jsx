import { useAtomValue, useSetAtom } from "jotai";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { currentRoundRecordAtom } from "../utilities/atom";
import NewStrokeForm from "../components/record/StrokeForms/NewStrokeForm";
import StrokesSummary from "../components/record/StrokesSummary";
import HoleDetails from "../components/record/HoleDetails";
import StrokeList from "../components/record/StrokeList";
import { updateStatsService } from "../utilities/rounds-service";
import toast from "react-hot-toast";
import { simpleConfirm } from "react-simple-dialogs";
import SectionHeader from "../components/common/SectionHeader";
import { PiArrowFatLinesRightFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const HolePage = () => {
  const { holeNo } = useParams();
  const navigate = useNavigate();
  const roundDetails = useAtomValue(currentRoundRecordAtom);
  const setCurrentRound = useSetAtom(currentRoundRecordAtom);

  // these 2 useState are cos idk how to derive from atom, but they are derived (refer to useEffect)
  // holeDetails - of golf course/ fixed
  // holeRecord - of user plays
  const [holeDetails, setHoleDetails] = useState({});
  const [holeRecord, setHoleRecord] = useState({});

  // toggle form
  const [showAddStroke, setShowAddStroke] = useState(false);

  // calculations for Links
  const firstHole = roundDetails.round_record?.[0].hole_num;
  const lastHole =
    roundDetails.round_record?.[roundDetails.round_record.length - 1].hole_num;
  const prevHole = holeNo == firstHole ? holeNo : parseInt(holeNo) - 1;
  const nextHole = holeNo == lastHole ? holeNo : parseInt(holeNo) + 1;


  const endHole = async () => {
    try {
      const updatedRound = await updateStatsService({
        round_id: roundDetails?._id,
        round_record_id: holeRecord?._id,
        is_completed: true,
      });
      setCurrentRound(updatedRound);
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  const endGame = async () => {
    if (
      await simpleConfirm({
        title: "End game?",
        confirmLabel: "End",
        cancelLabel: "Cancel",
      })
    ) {
      goToScorecard();
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
    setHoleRecord(
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
        tee={roundDetails?.tee}
        dist={holeDetails?.dists?.[roundDetails.tee]}
        dist_unit={roundDetails?.course?.dist_unit}
        index_no={
          holeDetails?.handicap_index?.[roundDetails.tee] ||
          holeDetails?.handicap_index?.all
        }
        handleLastHoleNext={goToScorecard}
      />

      <StrokesSummary holeRecord={holeRecord} par_no={holeDetails?.par} />

      <SectionHeader headerName={"stroke list"} />
      <div className="grow overflow-y-auto">
        <StrokeList holeRecord={holeRecord} round_id={roundDetails?._id} />

        {showAddStroke && (
          <NewStrokeForm
            roundId={roundDetails?._id}
            recordId={holeRecord?._id}
            total_strokes={holeRecord?.total_strokes}
            setShowAddStroke={setShowAddStroke}
            endHole={endHole}
          />
        )}
      </div>

      <div className="h-fit py-2 px-4 border-t border-black flex justify-around">
        <div
          className="w-fit h-fit px-3 py-2 rounded-lg bg-red-700/50 font-semibold border border-red-500"
          onClick={endGame}
        >
          <p className="uppercase font-medium text-white text-center tracking-tight">
            end game
          </p>
        </div>

        {holeRecord.is_completed ? (
          <Link
            className="w-1/2 h-fit px-3 py-2 flex items-center justify-center gap-2 rounded-lg bg-teal-700 font-semibold border border-teal-500"
            to={`/record/hole/${nextHole}`}
          >
            <p className="uppercase font-medium text-white text-center tracking-tight">
              Next hole
            </p>
            <PiArrowFatLinesRightFill className="text-white" />
          </Link>
        ) : (
          <div
            className="w-1/2 h-fit px-3 py-2 rounded-lg bg-teal-700 font-semibold border border-teal-500"
            onClick={() => setShowAddStroke(true)}
          >
            <p className="uppercase font-medium text-white text-center tracking-tight">
              add new stroke
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HolePage;
