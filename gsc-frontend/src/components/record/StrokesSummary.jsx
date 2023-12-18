import { analysePutts } from "../../utilities/scorecard-calculator";
import SectionHeader from "../common/SectionHeader";
import Stats from "./StrokesSummaryCards/Stats";
import TotalStrokes from "./StrokesSummaryCards/TotalStrokes";

const StrokesSummary = ({ holeRecord, par_no }) => {
  const stats = [
    {
      header: "GIR",
      value: holeRecord?.GIR ? 1 : 0,
      scoreType: holeRecord?.GIR ? "good" : "bad",
    },
    {
      header: "FIR",
      value: holeRecord?.FIR == undefined ? "-" : holeRecord?.FIR ? 1 : 0,
      scoreType:
        holeRecord?.FIR == undefined ? "NA" : holeRecord?.FIR ? "good" : "bad",
    },
    {
      header: "Putts",
      value: holeRecord?.putts,
      scoreType: analysePutts(holeRecord?.putts),
    },
    {
      header: "Penalty",
      value: holeRecord?.penalty_strokes,
      scoreType: holeRecord?.penalty_strokes > 0 ? "bad" : "good",
    },
  ];

  return (
    <>
      <SectionHeader headerName={"summary"} />

      {holeRecord?.is_completed ? (
        <div className="px-2 flex gap-2">
          <TotalStrokes
            total={holeRecord?.total_strokes}
            score={holeRecord?.total_strokes - par_no}
          />

          <div className="w-2/3 grid grid-cols-2 grid-rows-2 gap-2">
            {stats.map((stat, idx) => (
              <Stats
                key={idx}
                header={stat.header}
                value={stat.value}
                scoreType={stat.scoreType}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center gap-2">
          <p className="italic text-xs text-white">Hole not yet completed</p>
        </div>
      )}
    </>
  );
};

export default StrokesSummary;
