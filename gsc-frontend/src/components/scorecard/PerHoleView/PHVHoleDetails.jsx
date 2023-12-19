import TeeIcon from "../../common/TeeIcon";

const PHVHoleDetails = ({ courseHoleDetails, goNextHole, goPrevHole }) => {
  return (
    <div className="hole-page-hole-details flex flex-col justify-center bg-teal-950 slate-950 border-b border-teal-600">
      <div className="flex w-100 justify-center justify-between">
        <div className="flex items-center justify-center" onClick={goPrevHole}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-10 h-10 stroke-white stroke-2 fill-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-50 text-center py-2">
          Hole {courseHoleDetails?.hole_no}
        </h2>
        <div className="flex items-center justify-center" onClick={goNextHole}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-10 h-10 stroke-white stroke-2 fill-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
      <div className="w-100 grid grid-cols-3 gap-4 px-2 pb-3">
        <h2 className="justify-self-start text-xl text-slate-200">
          Par {courseHoleDetails?.par}
        </h2>
        <h2 className="flex items-center justify-self-center text-xl gap-2">
          <TeeIcon tee={courseHoleDetails?.tee} />{" "}
          <span className="text-slate-200">
            {courseHoleDetails?.dist}{" "}
            {courseHoleDetails?.dist_unit == "metres" ? "m" : "yd"}
          </span>
        </h2>
        <h2 className="justify-self-end text-xl text-slate-200">
          Index {courseHoleDetails?.index_no}
        </h2>
      </div>
    </div>
  );
};

export default PHVHoleDetails;
