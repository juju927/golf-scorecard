import { useState } from "react";
import { useEffect } from "react";
import dayjs from "dayjs";
import { getScorecardTableValues } from "../../../utilities/scorecard-calculator";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableIORow from "./TableIORow";
import TableTotalRow from "./TableTotalRow";

const ScorecardTable = ({ roundDetails }) => {
  const [tableValues, setTableValues] = useState({});

  useEffect(() => {
    setTableValues(getScorecardTableValues(roundDetails));
  }, [roundDetails]);

  return (
    <div className="table-page px-2 pb-4">
      <h1 className="text-3xl text-white font-bold">
        {roundDetails.course?.course_name}
      </h1>
      <div className="flex justify-between text-sm text-gray-400">
        <span className="font-light">
          Name:{" "}
          <span className="text-white font-bold">{roundDetails?.user?.profile?.display_name || roundDetails?.user?.username}</span>
        </span>
        <span className="font-light">
          Date:{" "}
          <span className="text-white font-bold">{dayjs(roundDetails.date).format("D MMM YYYY")}</span>
        </span>
      </div>


      {/* OUT table */}
      <TableHeader />
      {tableValues.out?.played && (
        <>
          {tableValues.out?.values?.map((rowValues, idx) => (
            <div
              key={`hole-${rowValues.hole_num}-row`}
              className={`${idx % 2 && "bg-gray-400/10"}`}
            >
              <TableRow rowValues={rowValues} />
            </div>
          ))}
          <TableIORow io="out" rowValues={tableValues.out?.total} />
        </>
      )}

      {/* IN table */}
      <TableHeader />
      {tableValues.in?.played && (
        <>
          {tableValues.in?.values?.map((rowValues, idx) => (
            <div
              key={`hole-${rowValues.hole_num}-row`}
              className={`${idx % 2 && "bg-gray-400/10"}`}
            >
              <TableRow rowValues={rowValues} />
            </div>
          ))}
          <TableIORow io="in" rowValues={tableValues.in?.total} />
        </>
      )}

      {(tableValues.in?.played && tableValues.out?.played) && <TableTotalRow rowValues={tableValues.total} />}
    </div>
  );
};

export default ScorecardTable;
