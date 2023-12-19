const DirectionInput = ({ stroke, setStroke }) => {
  const directions = ["left", "straight", "right"];

  const handleClick = (direction) => {
    setStroke((prevState) => ({
      ...prevState,
      analysis: {
        ...prevState.analysis,
        direction: prevState.analysis.direction == direction ? "" : direction,
      },
    }));
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 text-white pb-2 items-center">
        <h2
          className="font-light capitalize text-center"
          onClick={()=>handleClick("")}
        >
          direction
        </h2>
        {directions.map((direction) => (
          <div
            className={`border border-gray-700 bg-gray-700/50 p-2 text-gray-400 ${stroke.analysis.direction == direction && "bg-teal-500 text-white"}`}
            key={direction}
            value={direction}
            onClick={()=>handleClick(direction)}
          >
            <p className="text-center text-white">{direction}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectionInput;
