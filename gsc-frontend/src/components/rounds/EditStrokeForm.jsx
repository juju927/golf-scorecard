import { useState } from "react";
import toast from "react-hot-toast";
import { useSetAtom } from "jotai";
import { currentRoundRecordAtom } from "../../utilities/atom";
import { editStrokeService } from "../../utilities/rounds-service";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import GolfClubSelect from "./GolfClubSelect";
import GroundTypeSelect from "./GroundTypeSelect";
import ChipCheck from "./Chipcheck";

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
  const [showTooltip, setShowTooltip] = useState(false)

  const handleDirectionChange = (e) => {
    setEditedStroke((prevState) => ({
      ...prevState,
      analysis: {
        ...prevState.analysis,
        direction: e.target.value,
      },
    }));
  };

  const handleDistanceChange = (e) => {
    setEditedStroke((prevState) => ({
      ...prevState,
      analysis: {
        ...prevState.analysis,
        distance: e.target.value,
      },
    }));
  };

  const handleRemarksChange = (e) => {
    setEditedStroke((prevState) => ({
      ...prevState,
      analysis: {
        ...prevState.analysis,
        remarks: e.target.value,
      },
    }));
  };

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
              editedStroke={editedStroke}
              setEditedStroke={setEditedStroke}
            />
            <GolfClubSelect
              editedStroke={editedStroke}
              setEditedStroke={setEditedStroke}
            />
            <div>{/* empty div to use table space lol */}</div>
            <ChipCheck
              editedStroke={editedStroke}
              setEditedStroke={setEditedStroke}
            />
          </div>

          <div className="flex my-3 gap-2 relative">
            <h1 className="text-white text-xs uppercase">stroke analysis</h1>
            <AiOutlineQuestionCircle className="text-gray-400" onClick={()=> setShowTooltip(!showTooltip)} />
            <div className={`${!showTooltip && "hidden"} absolute right-0 bottom-5 z-10 p-2 text-justify text-xs bg-gray-400/90 rounded-sm w-3/4`}>
              <p>
                {" "}
                Stroke analysis is optional, <b>self-analysed</b> and saved for post-game
                reflection.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-white pb-2">
            <fieldset className="col-span-3 grid grid-cols-3 text-white">
              {["left", "straight", "right"].map((direction) => (
                <div key={direction}>
                  <input
                    type="radio"
                    name="directionOption"
                    value={direction}
                    id={direction}
                    className="peer hidden [&:checked_+_label_svg]:block"
                    checked={editedStroke.analysis.direction === direction}
                    onChange={handleDirectionChange}
                  />
                  <label
                    htmlFor={direction}
                    className="block cursor-pointer border border-gray-700 bg-gray-700/50 p-2 text-sm text-gray-700 font-medium shadow-sm peer-checked:border-teal-500 peer-checked:ring-1 peer-checked:ring-teal-500 peer-checked:bg-teal-500 peer-checked:text-white"
                  >
                    <p className="text-center">{direction}</p>
                  </label>
                </div>
              ))}
            </fieldset>
          </div>

          <div className="px-3 grid grid-cols-4 gap-2 text-white pb-2">
            <h1>distance</h1>
            <fieldset className="col-span-3 grid grid-cols-3 text-white">
              {["short", "average", "long"].map((distance) => (
                <div key={distance}>
                  <input
                    type="radio"
                    name="distanceOption"
                    value={distance}
                    id={distance}
                    className="peer hidden [&:checked_+_label_svg]:block"
                    checked={editedStroke.analysis.distance === distance}
                    onChange={handleDistanceChange}
                  />
                  <label
                    htmlFor={distance}
                    className="block cursor-pointer border border-gray-700 bg-gray-700/50 p-2 text-sm text-gray-700 font-medium shadow-sm peer-checked:border-teal-500 peer-checked:ring-1 peer-checked:ring-teal-500 peer-checked:bg-teal-500 peer-checked:text-white"
                  >
                    <p className="text-center">{distance}</p>
                  </label>
                </div>
              ))}
            </fieldset>
          </div>

          <div className="px-3 grid grid-cols-4 gap-2 text-white pb-2">
            <h1>remarks</h1>
            <textarea
              id="remarksText"
              className={`col-span-3 mt-2 align-top shadow-sm text-sm font-medium  ${
                editedStroke.analysis.remarks.length > 0
                  ? "text-white bg-teal-500"
                  : "border-gray-700 bg-gray-700/50 text-gray-700"
              }`}
              rows="4"
              value={editedStroke.analysis.remarks}
              placeholder="Enter any additional remarks..."
              onChange={handleRemarksChange}
            ></textarea>
          </div>
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
