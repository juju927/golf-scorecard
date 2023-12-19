const TotalStrokes = ({ total, score }) => {
  const scoreType = score < 0 ? "good" : score > 0 ? "bad" : "neutral";

  return (
    <div
      className={`px-1 py-2 w-1/3 rounded-sm ${
        scoreType == "good" && "bg-card-good-bg"
      } ${scoreType == "bad" && "bg-card-bad-bg"} ${
        scoreType == "neutral" && "bg-card-neutral-bg"
      } flex flex-col`}
    >
      <span className="pl-3 uppercase text-sm font-medium text-slate-700 tracking-tighter">
        total
      </span>
      <p className="w-full text-center oldstyle-nums">
        <span className="text-5xl font-bold text-black">
          {total}
          <span
            className={`text-lg align-super ${
              scoreType == "neutral" && "text-slate-700"
            } ${scoreType == "bad" && "text-red-500"} ${
              scoreType == "good" && "text-green-800"
            } `}
          >
            ({score > 0 && "+"}
            {score})
          </span>
        </span>
      </p>
    </div>
  );
};

export default TotalStrokes;
