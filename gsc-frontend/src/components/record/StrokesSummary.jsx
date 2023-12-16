import { analysePutts } from "../../utilities/scorecard-calculator";
import SectionHeader from "../common/SectionHeader";
import Stats from "./StrokesSummaryCards/Stats";
import TotalStrokes from "./StrokesSummaryCards/TotalStrokes";

const StrokesSummary = ({ strokeDetails, par_no }) => {
  const stats = [
    {
      header: "GIR",
      value: strokeDetails?.GIR ? 1 : 0,
      scoreType: strokeDetails?.GIR ? "good" : "bad",
    },
    {
      header: "FIR",
      value: strokeDetails?.FIR == undefined ? "-" : strokeDetails?.FIR ? 1 : 0,
      scoreType:
        strokeDetails?.FIR == undefined
          ? "NA"
          : strokeDetails?.FIR
          ? "good"
          : "bad",
    },
    {
      header: "Putts",
      value: strokeDetails?.putts,
      scoreType: analysePutts(strokeDetails?.putts, strokeDetails?.GIR),
    },
    {
      header: "Penalty",
      value: strokeDetails?.penalty_strokes,
      scoreType: strokeDetails?.penalty_strokes > 0 ? "bad" : "good",
    },
  ];

  return (
    <>
      <SectionHeader headerName={"summary"} />

      {strokeDetails?.is_completed ? (
        <div className="px-2 flex gap-2">
          <TotalStrokes
            total={strokeDetails?.total_strokes}
            score={strokeDetails?.total_strokes - par_no}
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
