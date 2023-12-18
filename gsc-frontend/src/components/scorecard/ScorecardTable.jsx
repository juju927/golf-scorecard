import TableRowDetails from "./TableRowDetails";

const ScorecardTable = ({ roundDetails }) => {
  const tableHeaders = [
    "hole",
    roundDetails?.course?.dist_unit,
    "par",
    "index",
    "strokes",
  ];
  return (
    <div className="table-outline w-full text-white">
      <table className="w-full p-2 border-collapse">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th className="border border-white" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {roundDetails?.round_record?.map((record) => (
            <TableRowDetails
              key={record._id}
              record={record}
              roundDetails={roundDetails}
            />
          ))}

          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScorecardTable;
