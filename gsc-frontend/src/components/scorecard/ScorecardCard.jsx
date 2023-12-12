import * as dayjs from "dayjs";
import StatBox from "./StatBox";

const ScorecardCard = ({ scorecardDetails }) => {

  return (
    <div className="card-outline min-w-80 h-fit px-4 pb-3 rounded-lg border-solid border-2 border-double border-emerald-500 bg-teal-400">
      <div className="user-profile flex h-20 gap-x-3 items-center border-b">
        <div>
          <img
            alt={scorecardDetails?.username}
            src={scorecardDetails?.profile_picture}
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p>
            <strong className="text-xs text-bold">
              {scorecardDetails?.name}
            </strong>
            <span className="pl-2 text-xs italic text-slate-500">
              @{scorecardDetails?.username}
            </span>
          </p>
          
          <div className="flex items-center text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>

          <p className="text-xs font-light text-gray-800">{scorecardDetails?.course}</p>
        </div>


        <div className="flex items-center text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <p className="text-xs font-light">
            {dayjs(scorecardDetails?.date).format("D MMM YYYY, h:mmA")}
          </p>
        </div>

        </div>
      </div>

      <div className="w-full pb-1 text-2xl font-extrabold text-white text-center uppercase tracking-tight">
        round stats
      </div>
      <div className="scorecard-details h-fit grid grid-cols-2 auto-rows-auto gap-2">
        <StatBox stat="net score" value={scorecardDetails?.netScore} />
        <StatBox stat="gross score" value={scorecardDetails?.grossScore} />
        <StatBox stat="greens in regulation" value={scorecardDetails?.GIR} />
        <StatBox stat="fairway accuracy" value={scorecardDetails?.FIR} />
        <StatBox
          stat="putts per round"
          value={scorecardDetails?.puttsPerRound}
        />
        <StatBox
          stat="putting average"
          value={scorecardDetails?.puttingAverage}
        />
      </div>
    </div>
  );
};

export default ScorecardCard;
