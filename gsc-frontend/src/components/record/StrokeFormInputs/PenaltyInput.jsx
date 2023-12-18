import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import PenaltyForm from "./PenaltyForm";

const PenaltyInput = ({ stroke, setStroke }) => {
  const [isOpen, setIsOpen] = useState(false);
  const penaltyTypes = {
    Water: "💧",
    OB: "🏘️",
    Lost: "😶‍🌫️",
    Whiff: "💨",
    Other: "🟥",
  };
  const penaltyAmts = [1, 2, 3];

  return (
    <div className="w-full h-full flex items-center justify-start">
      <div
        className="h-fit w-fit ml-3 p-2 border border-red-800"
        onClick={() => setIsOpen(true)}
      >
        {stroke.penalty?.penalty_type ? (
          <div className="flex items-center gap-2 uppercase text-xs text-red-800 tracking-tighter divide-x">
            <span>{penaltyTypes[stroke.penalty?.penalty_type]} {stroke.penalty?.penalty_type}</span>
            <span className="pl-2">
              + {stroke.penalty?.penalty_amt} stroke
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <AiOutlinePlusCircle className="text-red-800" />
            <span className="uppercase text-xs text-red-800 tracking-tighter">
              add penalty
            </span>
          </div>
        )}
      </div>

      <PenaltyForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        penaltyTypes={penaltyTypes}
        penaltyAmts={penaltyAmts}
        stroke={stroke}
        setStroke={setStroke}
      />
    </div>
  );
};

export default PenaltyInput;
