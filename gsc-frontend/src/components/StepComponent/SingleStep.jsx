const SingleStep = ({ number, title, isComplete }) => {
  return (
    <>
      {isComplete ? (
        <>
          <li className="flex">
            <span className="rounded bg-green-50 p-1.5 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </li>
        </>
      ) : (
        <>
          <li className="flex items-center justify-center gap-2 text-blue-600">
            <span className="h-6 w-6 rounded bg-blue-50 text-center text-[10px]/6 font-bold">
              {number}
            </span>

            <span> {title} </span>
          </li>
        </>
      )}
    </>
  );
};

export default SingleStep;
