import { useState } from "react";
import toast from "react-hot-toast";
import { useAtomValue, useSetAtom } from "jotai";
import { currentRoundRecordAtom, userProfileAtom } from "../../utilities/atom";
import { editStrokeService } from "../../utilities/rounds-service";


const EditStrokeForm = ({
  round_id,
  round_record_id,
  stroke,
  idx,
  setShowEditStroke,
}) => {
  const setCurrentRound = useSetAtom(currentRoundRecordAtom);
  const userProfile = useAtomValue(userProfileAtom);

  const clubs = userProfile?.golf_bag;
  const groundTypes = ["Tee-off", "Fairway", "Rough", "Sand", "Green"];
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

  const handleClubChange = (e) => {
    setEditedStroke((prevState) => ({
      ...prevState,
      club: clubs[e.target.value],
    }));
  };

  const handleGroundChange = (e) => {
    setEditedStroke((prevState) => ({
      ...prevState,
      ground: e.target.value,
    }));
  };

  const handleChipChange = () => {
    setEditedStroke((prevState) => ({
      ...prevState,
      is_chip: !editedStroke.is_chip,
    }));
  };

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
      <div className="w-full h-10/12 shadow-md rounded-lg border border-black bg-gray-900">
      <div
        className="flex justify-center"
        onClick={() => setShowEditStroke(false)}
      >
        <h1 className="text-center text-gray-500 pl-2 my-3">
          Editing stroke #{idx + 1}
        </h1>
        <div className="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="w-5 h-5 fill-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <>
        <h1 className="text-white pl-2 my-3 text-xs uppercase">
          stroke details
        </h1>
        <div className="px-3 grid grid-cols-4 gap-2 pb-2 text-white">
          <h1>club</h1>
          <fieldset className="col-span-3 grid grid-cols-5 grid-rows-auto text-white">
            {clubs.map((club, idx) => (
              <div key={club.serial}>
                <input
                  type="radio"
                  name="clubOption"
                  value={idx}
                  id={club.name}
                  className="peer hidden [&:checked_+_label_svg]:block"
                  checked={editedStroke.club.serial === club.serial}
                  onChange={handleClubChange}
                />
                <label
                  htmlFor={club.name}
                  className="block cursor-pointer border border-gray-700 bg-gray-700/50 p-2 text-sm text-gray-700 font-medium shadow-sm peer-checked:border-teal-500 peer-checked:ring-1 peer-checked:ring-teal-500 peer-checked:bg-teal-500 peer-checked:text-white"
                >
                  <p className="text-center">{club.abbrvName}</p>
                </label>
              </div>
            ))}
          </fieldset>
        </div>

        <div className="px-3 grid grid-cols-4 gap-2 text-white">
          <h1>ground</h1>
          <fieldset className="col-span-3 grid grid-cols-3 grid-rows-2 text-white">
            {groundTypes.map((ground) => (
              <div key={ground}>
                <input
                  type="radio"
                  name="groundOption"
                  value={ground}
                  id={ground}
                  className="peer hidden [&:checked_+_label_svg]:block"
                  checked={editedStroke.ground === ground}
                  onChange={handleGroundChange}
                />
                <label
                  htmlFor={ground}
                  className="block cursor-pointer border border-gray-700 bg-gray-700/50 p-2 text-sm text-gray-700 font-medium shadow-sm peer-checked:border-teal-500 peer-checked:ring-1 peer-checked:ring-teal-500 peer-checked:bg-teal-500 peer-checked:text-white"
                >
                  <p className="text-center">{ground}</p>
                </label>
              </div>
            ))}
          </fieldset>
          <div></div>
          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
              type="checkbox"
              value={editedStroke.is_chip}
              id="isChipCheck"
              checked={editedStroke.is_chip}
              onChange={handleChipChange}
            />
            <label
              className="inline-block pl-[0.15rem] hover:cursor-pointer text-white"
              htmlFor="isChipCheck"
            >
              Chip
            </label>
          </div>
        </div>

        <h1 className="text-white pl-2 my-3 text-xs uppercase">
          stroke analysis
        </h1>
        <div className="px-3 grid grid-cols-4 gap-2 text-white pb-2">
          <h1>direction</h1>
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
      </>

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
