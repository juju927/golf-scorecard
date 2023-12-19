import { useState } from "react";
import ScorecardCard from "../components/scorecard/CardView/ScorecardCard";
import ScorecardTable from "../components/scorecard/TableView/ScorecardTable";
import ScorecardPH from "../components/scorecard/PerHoleView/ScorecardPH";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getRoundService } from "../utilities/rounds-service";
import { getScorecardValues } from "../utilities/scorecard-calculator";
import toast from "react-hot-toast";
import { AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

const ScorecardPage = () => {
  const { roundId } = useParams();
  const [roundDetails, setRoundDetails] = useState({});
  const [scorecardDetails, setScorecardDetails] = useState({});

  const views = ["table", "card", "hole"];
  const [view, setView] = useState(views[1]);

  const goBack = () => {
    setRoundDetails({})
    setScorecardDetails({})
  }

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
    <div className="h-full w-full flex flex-col items-center">
      <div className="w-full px-3 py-2 flex justify-between items-center">
        <Link to="/analyse" onClick={goBack}>
          <AiOutlineLeft className="text-white text-3xl"/>
        </Link>

        <div className="w-5/6 p-0.5 grid grid-cols-3 gap-3 rounded-sm bg-gray-500/50">
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
      <div className="h-full w-full">
        {view == views[0] && <ScorecardTable roundDetails={roundDetails} />}
        {view == views[1] && <ScorecardCard scorecardDetails={scorecardDetails} />}
        {view == views[2] && <ScorecardPH roundDetails={roundDetails} />}
      </div>
    </div>
  );
};

export default ScorecardPage;
