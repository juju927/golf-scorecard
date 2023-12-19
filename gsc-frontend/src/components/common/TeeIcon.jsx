import { FaGolfBallTee } from "react-icons/fa6";

const TeeIcon = ({ tee }) => {
  const teeColours = {
    "white": "border-white text-white",
    "red": "border-red-600 text-red-600",
    "blue": "border-blue-600 text-blue-600",
    "green": "border-green-600 text-green-600",
    "gold": "border-yellow-400 text-yellow-400",
    "yellow": "border-yellow-400 text-yellow-400",
    "silver": "border-gray-400 text-gray-400",
    "black": "border-black text-black",

  }

  return (
    <div className={`rounded-full h-fit w-fit p-1 border border-2 ${teeColours[tee]}`}>
      <FaGolfBallTee />
    </div>
  );
};

export default TeeIcon;
