const StatBox = ({ stat, value }) => {
  return (
    <div className="stat-box h-16 w-full flex flex-col">
      <div className="stat-box-header w-full h-6 flex justify-center items-center bg-teal-700">
        <p className="h-fit text-white text-xs uppercase tracking-tighter">
          {stat}
        </p>
      </div>

      <div className="stat-box-body w-full h-full flex justify-center items-center bg-teal-100">
        <span className="text-3xl font-extrabold text-teal-700">
          {value}
          {(stat == "greens in regulation" || stat == "fairway accuracy") &&
            "%"}
        </span>
      </div>
    </div>
  );
};

export default StatBox;
