const Stats = ({ header, value, scoreType }) => {
  return (
    <div
      className={`w-full h-full px-1 py-2 rounded-sm ${
        scoreType == "good" && "bg-card-good-bg"
      } ${scoreType == "bad" && "bg-card-bad-bg"} ${
        scoreType == "neutral" && "bg-card-neutral-bg"
      } ${scoreType == "NA" && "bg-slate-800/80"}
    grid grid-cols-3 divide-x divide-black items-center justify-center`}
    >
      <span className="uppercase text-sm text-slate-700 text-center font-medium tracking-tighter col-span-2">
        {header}
      </span>
      <span
        className={`oldstyle-nums text-xs text-center font-bold ${
          scoreType == "neutral" && "text-slate-700"
        } ${scoreType == "bad" && "text-red-500"} ${
          scoreType == "good" && "text-green-800"
        }`}
      >
        {value}
      </span>
    </div>
  );
};

export default Stats;
