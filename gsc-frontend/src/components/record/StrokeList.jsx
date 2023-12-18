import StrokeListItem from "./ListItems/StrokeListItem";

const StrokeList = ({ holeRecord, round_id }) => {
  return (
    <div>
      {holeRecord?.stroke_details?.length == 0 ? (
        <div className="font-light italic text-center text-xs text-slate-100">
          no shots played yet
        </div>
      ) : (
        holeRecord?.stroke_details?.map((stroke, idx) => (
          <StrokeListItem
            key={stroke._id}
            idx={idx}
            stroke={stroke}
            round_id={round_id}
            round_record_id={holeRecord._id}
          />
        ))
      )}
    </div>
  );
};

export default StrokeList;
