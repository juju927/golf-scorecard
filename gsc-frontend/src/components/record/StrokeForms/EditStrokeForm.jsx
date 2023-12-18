import { useState } from "react";
import toast from "react-hot-toast";
import { useSetAtom } from "jotai";
import { currentRoundRecordAtom } from "../../../utilities/atom";
import { editStrokeService } from "../../../utilities/rounds-service";
import { AiOutlineClose } from "react-icons/ai";
import GolfClubSelect from "../StrokeFormInputs/GolfClubSelect";
import GroundTypeSelect from "../StrokeFormInputs/GroundTypeSelect";
import ChipCheck from "../StrokeFormInputs/ChipCheck";
import DirectionInput from "../StrokeFormInputs/DirectionInput";
import DistanceInput from "../StrokeFormInputs/DistanceInput";
import RemarksInput from "../StrokeFormInputs/RemarksInput";
import PenaltyInput from "../StrokeFormInputs/PenaltyInput";

const EditStrokeForm = ({
  round_id,
  round_record_id,
  stroke,
  setShowEditStroke,
}) => {
  const setCurrentRound = useSetAtom(currentRoundRecordAtom);

  const [editedStroke, setEditedStroke] = useState({
    round_id: round_id,
    round_record_id: round_record_id,
    stroke_id: stroke._id,
    is_chip: stroke.is_chip,
    penalty: stroke.penalty,
    club: stroke.club,
    ground: stroke.ground,
    analysis: {
      direction: stroke.analysis.direction,
      distance: stroke.analysis.distance,
      remarks: stroke.analysis.remarks,
    },
  });

  const handleEditStroke = async () => {
    if (!editedStroke.club || !editedStroke.ground) {
      toast.error("Please add stroke details.");
      return;
    }
    try {
      const updatedRound = await editStrokeService(editedStroke);
      setCurrentRound(updatedRound);
      setShowEditStroke(false);
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-screen h-screen overflow-y-auto z-10 bg-gray-900/10 flex items-end justify-center">
      <div className="relative w-full h-10/12 shadow-md rounded-lg border border-black bg-gray-900">
        <div
          className="flex justify-center bg-black border-b border-white shadow-md"
          onClick={() => setShowEditStroke(false)}
        >
          <h1 className="text-center text-white my-3 text-lg tracking-wide font-semibold">
            Editing stroke
          </h1>

          <div
            className="absolute right-3 top-3 flex justify-center items-center"
            onClick={() => setShowEditStroke(false)}
          >
            <AiOutlineClose className="text-white w-6 h-6" />
          </div>
        </div>

        <div className="px-2 pt-4 flex flex-col gap-3">
          <div>
            <h1 className="text-white my-3 text-xs uppercase">
              stroke details
            </h1>

            <div className="w-full grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-1">
              <GroundTypeSelect
                stroke={editedStroke}
                setStroke={setEditedStroke}
              />
              <GolfClubSelect
                stroke={editedStroke}
                setStroke={setEditedStroke}
              />
              <PenaltyInput stroke={editedStroke} setStroke={setEditedStroke} />
              <ChipCheck stroke={editedStroke} setStroke={setEditedStroke} />
            </div>
          </div>

          <div>
            <h1 className="text-white text-xs uppercase">stroke analysis</h1>
            <p className="pb-2 text-xs text-gray-400 font-light tracking-tight">
              Stroke analysis is optional.
            </p>

            <DirectionInput stroke={editedStroke} setStroke={setEditedStroke} />
            <DistanceInput stroke={editedStroke} setStroke={setEditedStroke} />
          </div>

          <div>
            <h1 className="pb-2 text-white text-xs uppercase">
              stroke remarks
            </h1>
            <RemarksInput stroke={editedStroke} setStroke={setEditedStroke} />
          </div>
        </div>

        <div className="py-2 px-4 flex justify-center">
          <button
            className="h-fit px-3 py-2 rounded-lg bg-teal-700 text-white font-semibold border border-teal-500 uppercase"
            onClick={handleEditStroke}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStrokeForm;
