const PHVPenaltyTag = ({ penalty }) => {
  return (
    <div className="inline h-fit w-fit flex px-2 gap-2 divide-x divide-white border border-red-800 text-red-400 text-sm font-light tracking-tighter">
      <span>{penalty?.penalty_type}</span>
      <span className="pl-2">+ {penalty?.penalty_amt} stroke</span>
    </div>
  );
};

export default PHVPenaltyTag;
