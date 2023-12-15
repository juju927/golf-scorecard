import { useState } from "react";
import toast from "react-hot-toast";
import { useSetAtom } from "jotai";
import { currentRoundRecordAtom } from "../../../utilities/atom";
import { editStrokeService } from "../../../utilities/rounds-service";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import GolfClubSelect from "../StrokeFormInputs/GolfClubSelect";
import GroundTypeSelect from "../StrokeFormInputs/GroundTypeSelect";
import ChipCheck from "../StrokeFormInputs/ChipCheck";
import DirectionInput from "../StrokeFormInputs/DirectionInput";
import DistanceInput from "../StrokeFormInputs/DistanceInput";
import RemarksInput from "../StrokeFormInputs/RemarksInput";

const EditStrokeForm = ({
  round_id,
  round_record_id,
  stroke,
  idx,
  setShowEditStroke,
}) => {
  const setCurrentRound = useSetAtom(currentRoundRecordAtom);

  const [editedStroke, setEditedStroke] = useState({
    round_id: round_id,
    round_record_id: round_record_id,
    stroke_id: stroke._id,
    is_chip: stroke.is_chip,
    club: stroke.club,
    ground: stroke.ground,
    analysis: {
      direction: stroke.analysis.direction,
      distance: stroke.analysis.distance,
      remarks: stroke.analysis.remarks,
    },
  });
  const [showTooltip, setShowTooltip] = useState(false);

  const handleAddStroke = async () => {
    try {
      const updatedRound = await editStrokeService(editedStroke);
      setCurrentRound(updatedRound);
      setShowEditStroke(false);
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-screen h-screen overflow-y-auto z-10 bg-gray-900/90 flex items-end justify-center">
      <div className="relative w-full h-10/12 shadow-md rounded-lg border border-black bg-gray-900">
        <div
          className="flex justify-center bg-black border-b border-white shadow-md"
          onClick={() => setShowEditStroke(false)}
        >
          <h1 className="text-center text-white my-3 text-lg tracking-wide font-semibold">
            Editing stroke {idx + 1}
          </h1>

          <div
            className="absolute right-3 top-3 flex justify-center items-center"
            onClick={() => setShowEditStroke(false)}
          >
            <AiOutlineClose className="text-white w-6 h-6" />
          </div>
        </div>

        <div className="px-2">
          <h1 className="text-white my-3 text-xs uppercase">stroke details</h1>

          <div className="w-full grid grid-cols-2 grid-rows-2">
            <GroundTypeSelect
              stroke={editedStroke}
              setStroke={setEditedStroke}
            />
            <GolfClubSelect
              stroke={editedStroke}
              setStroke={setEditedStroke}
            />
            <div>{/* empty div to use table space lol */}</div>
            <ChipCheck
              stroke={editedStroke}
              setStroke={setEditedStroke}
            />
          </div>

          <div className="flex my-3 gap-2 relative">
            <h1 className="text-white text-xs uppercase">stroke analysis</h1>
            <AiOutlineQuestionCircle
              className="text-gray-400"
              onClick={() => setShowTooltip(!showTooltip)}
            />
            <div
              className={`${
                !showTooltip && "hidden"
              } absolute right-0 bottom-5 z-10 p-2 text-justify text-xs bg-gray-400/90 rounded-sm w-3/4`}
            >
              <p>
                {" "}
                Optional, <b>self-analysed</b> and saved for post-game review.
                Can be reset by clicking the header.
              </p>
            </div>
          </div>

          <DirectionInput
            stroke={editedStroke}
            setStroke={setEditedStroke}
          />
          <DistanceInput
            stroke={editedStroke}
            setStroke={setEditedStroke}
          />
          <RemarksInput
            stroke={editedStroke}
            setStroke={setEditedStroke}
          />
        </div>

        <div className="py-2 px-4 flex justify-center">
          <button
            className="p-3 w-full block rounded-lg bg-teal-500 text-white shadow-md shadow-teal-500/50 uppercase"
            onClick={handleAddStroke}
          >
            edit stroke
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStrokeForm;
