const DistanceInput = ({ stroke, setStroke }) => {
  const distances = ["short", "average", "long"];

  const handleClick = (distance) => {
    
    setStroke((prevState) => ({
      ...prevState,
      analysis: {
        ...prevState.analysis,
        distance: prevState.analysis.distance == distance ? "" : distance,
      },
    }));
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 text-white pb-2 items-center">
        <h2
          className="font-light capitalize text-center"
          onClick={() => handleClick("")}
        >
          distance
        </h2>
        {distances.map((distance) => (
          <div
            className={`border border-gray-700 bg-gray-700/50 p-2 text-gray-400 ${
              stroke.analysis.distance == distance && "bg-teal-500 text-white"
            }`}
            key={distance}
            value={distance}
            onClick={() => handleClick(distance)}
          >
            <p className="text-center text-white">{distance}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistanceInput;
