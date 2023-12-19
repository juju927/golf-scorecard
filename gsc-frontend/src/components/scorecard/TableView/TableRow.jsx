const TableRow = ({ rowValues }) => {
  return (
    <div className="h-10 flex text-white justify-between text-center items-center lining-nums text-lg font-semibold">
      <div className="w-1/6">{rowValues?.hole_num}</div>
      <div className="w-1/5">{rowValues?.dist}</div>
      <div className="w-1/5">{rowValues?.index}</div>
      <div className="w-1/5">{rowValues?.par}</div>
      {/* <div className="w-1/6">{rowValues?.strokes}<span className="text-sm font-normal text-slate-400 align-super">({rowValues?.score > 0 && "+"}{rowValues?.score})</span></div> */}
      <div className="w-1/6">
        {rowValues?.score > 0 && "+"}
        {rowValues?.score}
      </div>
    </div>
  );
};

export default TableRow;
