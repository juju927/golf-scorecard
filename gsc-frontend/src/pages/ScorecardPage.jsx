import { useState } from "react";
import ScorecardCard from "../components/scorecard/ScorecardCard";
import ScoreCardTable from "../components/scorecard/ScorecardTable";
import ScorecardPH from "../components/scorecard/ScorecardPH";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getRoundService } from "../utilities/rounds-service";
import { getScorecardValues } from "../utilities/scorecard-calculator";
import toast from "react-hot-toast";

const ScorecardPage = () => {
  const { roundId } = useParams();
  const [roundDetails, setRoundDetails] = useState({});
  const [scorecardDetails, setScorecardDetails] = useState({});

  const views = ["table", "card", "hole"];
  const [view, setView] = useState(views[1]);

  useEffect(() => {
    const getRound = async () => {
      try {
        const round = await getRoundService(roundId);
        setRoundDetails(round)
        setScorecardDetails(getScorecardValues(round));
      } catch (err) {
        toast.error(`${err.message}`);
      }
    };
    getRound();
  }, [roundId]);


  return (
    <div className="h-full w-full flex flex-col items-center overflow-y-scroll">
      <div className="py-2">
        <div className="w-80 p-0.5 grid grid-cols-3 gap-3 rounded-sm bg-gray-500/50">
          {views.map((viewType) => (
            <div
              className={`rounded-sm ${view == viewType && "bg-teal-500/50"}`}
              key={viewType}
              onClick={() => setView(viewType)}
            >
              <p className="uppercase text-lg text-center text-white font-bold">
                {viewType}
              </p>
            </div>
          ))}
        </div>

      </div>
      <div className="h-full w-full px-3">
        {view == views[0] && <ScoreCardTable roundDetails={roundDetails} scorecardDetails={scorecardDetails} />}
        {view == views[1] && <ScorecardCard scorecardDetails={scorecardDetails} />}
        {view == views[2] && <ScorecardPH roundDetails={roundDetails} />}
      </div>
    </div>
  );
};

export default ScorecardPage;
