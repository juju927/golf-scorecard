import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { addStrokeService } from "../../../utilities/rounds-service";
import { useSetAtom } from "jotai";
import { currentRoundRecordAtom } from "../../../utilities/atom";
import { useClickAway } from "@uidotdev/usehooks";
import { AiOutlineClose, AiOutlineQuestionCircle } from "react-icons/ai";
import GroundTypeSelect from "../StrokeFormInputs/GroundTypeSelect";
import GolfClubSelect from "../StrokeFormInputs/GolfClubSelect";
import ChipCheck from "../StrokeFormInputs/ChipCheck";
import DirectionInput from "../StrokeFormInputs/DirectionInput";
import DistanceInput from "../StrokeFormInputs/DistanceInput";
import RemarksInput from "../StrokeFormInputs/RemarksInput";

const NewStrokeForm = ({ roundId, recordId, setShowAddStroke }) => {
  const setCurrentRound = useSetAtom(currentRoundRecordAtom);
  const ref = useClickAway(() => {
    setShowAddStroke(false);
  });

  const [newStroke, setNewStroke] = useState({
    round_id: roundId,
    round_record_id: recordId,
    is_chip: false,
    club: "",
    ground: "",
    analysis: {
      direction: "",
      distance: "",
      remarks: "",
    },
  });
  const [showTooltip, setShowTooltip] = useState(false);

  const handleAddStroke = async () => {
    if (!newStroke.club || !newStroke.ground) {
      toast.error("Please add stroke details.");
      return;
    }
    try {
      const updatedRound = await addStrokeService(newStroke);
      resetForm();
      setCurrentRound(updatedRound);
      setShowAddStroke(false);
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  const resetForm = () => {
    setNewStroke({
      round_id: roundId,
      round_record_id: recordId,
      is_chip: false,
      club: "",
      ground: "Tee-off",
      analysis: {
        direction: "straight",
        distance: "average",
        remarks: "",
      },
    });
  };

  useEffect(() => {
    setNewStroke((prevState) => ({
      ...prevState,
      round_id: roundId,
      round_record_id: recordId,
    }));
  }, [roundId, recordId]);

  return (
    <div className="absolute top-0 left-0 w-screen h-screen overflow-y-auto z-10 bg-gray-900/90 flex items-end justify-center">
      <div
        className="relative w-full h-10/12 shadow-md rounded-lg border border-black bg-gray-900"
        ref={ref}
      >
        <div className="flex justify-center bg-black border-b border-white shadow-md">
          <h1 className="text-center text-white my-3 text-lg tracking-wide font-semibold">
            Add new stroke
          </h1>
        </div>

        <div
          className="absolute right-3 top-3 flex justify-center items-center"
          onClick={() => setShowAddStroke(false)}
        >
          <AiOutlineClose className="text-white w-6 h-6" />
        </div>

        <div className="px-2">
          <h1 className="text-white my-3 text-xs uppercase">stroke details</h1>

          <div className="w-full grid grid-cols-2 grid-rows-2">
            <GroundTypeSelect stroke={newStroke} setStroke={setNewStroke} />

            <GolfClubSelect stroke={newStroke} setStroke={setNewStroke} />
            <div>{/* empty div to use table space lol */}</div>
            <ChipCheck stroke={newStroke} setStroke={setNewStroke} />
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

          <DirectionInput stroke={newStroke} setStroke={setNewStroke} />
          <DistanceInput stroke={newStroke} setStroke={setNewStroke} />
          <RemarksInput stroke={newStroke} setStroke={setNewStroke} />

          <div className="py-2 px-4 flex justify-center">
            <button
              className="p-3 w-full block rounded-lg bg-teal-500 text-white shadow-md shadow-teal-500/50 uppercase"
              onClick={handleAddStroke}
            >
              add stroke
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStrokeForm;
