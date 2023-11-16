const StrokesSummary = ({
  total,
  penalty,
  GIR,
  addPenalty,
  removePenalty,
  toggleGIR,
}) => {
  return (
    <div className="pb-2 flex">
      {/* penalty strokes */}
      <div className="h-20 w-1/3 flex flex-col">
        <div className="h-fit w-full bg-rose-300 px-2 py-1">
          <div className="uppercase text-black tracking-tight font-light text-center">
            penalty
          </div>
        </div>

        <div className="grow bg-rose-900 grid grid-rows-2 grid-cols-3 place-items-center divide-x">
          <div className="row-span-2 col-span-2">
            <p className="text-2xl font-bold text-white">{penalty}</p>
          </div>
          <div
            className="h-full w-full flex justify-center items-center"
            onClick={addPenalty}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 fill-white"
            >
              <path d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" />
            </svg>
          </div>
          <div
            className="h-full w-full flex justify-center items-center"
            onClick={removePenalty}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 fill-white"
            >
              <path d="M6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
            </svg>
          </div>
        </div>
      </div>

      {/* total strokes */}
      <div className="h-20 w-1/3 flex flex-col">
        <div className="h-fit w-full bg-green-100 px-2 py-1">
          <div className="uppercase text-black tracking-tight font-bold text-center">
            total
          </div>
        </div>
        <div className="grow bg-green-900 w-full flex justify-center items-center">
          <p className="text-3xl font-bold text-white">{total}</p>
        </div>
      </div>

      {/* GIR */}
      <div className="h-20 w-1/3 flex flex-col" onClick={() => toggleGIR(!GIR)}>
        <div className="h-fit bg-teal-300 px-2 py-1">
          <div className="uppercase text-blade tracking-tight font-light text-center">
            GIR
          </div>
        </div>
        <div
          className={`grow w-full ${
            GIR ? "bg-teal-900" : "bg-rose-900"
          } flex justify-center items-center`}
        >
          <p className="text-2xl font-bold text-white">
            {GIR ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StrokesSummary;
