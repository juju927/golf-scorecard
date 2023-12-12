import StrokeListItem from "../rounds/StrokeListItem";

const StrokeList = ({ strokeDetails, round_id }) => {
  return (
    <div>
      <div className="flex py-5 px-2 items-center">
        <div className="flex-grow border-t border-slate-400"></div>
        <span className="flex-shrink mx-4 text-slate-400 uppercase tracking-widest text-xs">
          stroke list
        </span>
        <div className="flex-grow border-t border-slate-400"></div>
      </div>

      {/* actual list */}
      {strokeDetails?.stroke_details?.length == 0 ? (
        <div className="font-light italic text-center text-xs text-slate-100">
          no shots played yet
        </div>
      ) : (
        strokeDetails?.stroke_details?.map((stroke, idx) => (
          <StrokeListItem
            key={stroke._id}
            idx={idx}
            stroke={stroke}
            round_id={round_id}
            round_record_id={strokeDetails._id}
          />
        ))
      )}
    </div>
  );
};

export default StrokeList;
