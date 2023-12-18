import { penaltyTypes } from "../../../../utilities/icons";

const PenaltyTag = ({ penalty }) => {
  return (
    <>
      {penalty && (
        <div className="w-fit h-fit flex gap-2 px-2 text-sm text-red-800 rounded-full border border-2 border-red-800 bg-red-400">
          <span>{penaltyTypes[penalty?.penalty_type]}</span>
          <span>+{penalty?.penalty_amt}</span>
        </div>
      )}
    </>
  );
};

export default PenaltyTag;
