const HandicapInput = ({ handicap, handleHandicapChange, isValid }) => {
  return (
    <>
      <h1 className="text-center text-2xl font-bold text-white pb-5">
        What is your golf handicap?
      </h1>

      <input
        id="handicapInput"
        inputMode="numeric"
        pattern="[0-9]*"
        type="text"
        value={handicap}
        onChange={handleHandicapChange}
        className={`w-full bg-gray-700/50 ${isValid ? "border-none" : "border-red-500"} text-white `}
      />
      <p className={`${isValid && "invisible"} text-left text-xs text-red-500`}>
        Handicap must be a number from 0 to 53.
      </p>

      <p className="mt-5 text-left text-xs text-gray-500">
        Your golf handicap will be used to calculate your net score on the
        scorecard.
      </p>
    </>
  );
};

export default HandicapInput;
