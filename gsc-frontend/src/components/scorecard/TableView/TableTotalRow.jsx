const TableTotalRow = ({ rowValues }) => {
  return (
    <div className="h-10 flex text-white justify-between text-center items-center lining-nums text-lg font-semibold">
      <div className="w-1/6 uppercase">total</div>
      <div className="w-1/5">{rowValues?.dist}</div>
      <div className="w-1/5"></div>
      <div className="w-1/5">{rowValues?.par}</div>
      {/* <div className="w-1/6">{rowValues?.strokes}</div> */}
      <div className={`w-1/6 ${rowValues?.score > 0 && "text-red-500"} ${rowValues?.score < 0 && "text-green-500"}`}>
        {rowValues?.score > 0 && "+"}
        {rowValues?.score}
      </div>
    </div>
  );
};

export default TableTotalRow;
