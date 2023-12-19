import PHVPenaltyTag from "./PHVPenaltyTag";


const StrokeDetails = ({ stroke, idx }) => {
  return (
    <div
      className={`w-full h-fit px-4 py-2 flex gap-3 ${
        idx % 2 && "bg-white/10"
      }`}
    >
      <p className="text-white text-xl font-medium font-serif tabular-nums">
        {idx + 1}.
      </p>
      <div className="grow">
        <div className="flex gap-2">
          <span
            className={`uppercase font-bold text-lg ${
              stroke.ground == "Tee-off" && "text-green-400"
            } ${stroke.ground == "Fairway" && "text-green-500"} ${
              stroke.ground == "Green" && "text-green-300"
            } ${stroke.ground == "Rough" && "text-green-600"} ${
              stroke.ground == "Sand" && "text-stone-400"
            }`}
          >
            {stroke.ground}
          </span>
          {stroke?.penalty && <PHVPenaltyTag penalty={stroke?.penalty} />}
        </div>
        {stroke?.analysis?.remarks?.length > 0 && (
          <p className="italic text-white">
            &quot;{stroke?.analysis?.remarks}&quot;
          </p>
        )}
      </div>

      <span className="h-16 text-end self-end align-right text-gray-300 text-sm capitalize">
        {stroke.club?.name}
      </span>
    </div>
  );
};

export default StrokeDetails;
