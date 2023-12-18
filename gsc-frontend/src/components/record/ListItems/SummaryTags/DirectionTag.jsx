import { GoArrowUpRight } from "react-icons/go";
import { GoArrowUpLeft } from "react-icons/go";
import { GoArrowUp } from "react-icons/go";

const DirectionTag = ({ direction }) => {
  return (
    <>
      {(direction == "left" || direction == "right") && (
        <div className="w-fit h-fit text-xl font-bold text-red-800 rounded-full border border-2 border-red-800 bg-red-400">
          {direction == "left" && <GoArrowUpLeft />}
          {direction == "right" && <GoArrowUpRight />}
        </div>
      )}

      { direction == "straight" && (
        <div className="w-fit h-fit text-xl font-bold text-green-800 rounded-full border border-2 border-green-800 bg-green-400">
        <GoArrowUp />
      </div>
      )}
    </>
  );
};

export default DirectionTag;
