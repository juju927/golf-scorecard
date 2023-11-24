import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { addStrokeService } from "../../utilities/rounds-service";
import { useAtomValue, useSetAtom } from "jotai";
import { currentRoundRecordAtom, userProfileAtom } from "../../utilities/atom";

const NewStrokeForm = ({ roundId, recordId, setShowAddStroke }) => {
  const setCurrentRound = useSetAtom(currentRoundRecordAtom);
  const userProfile = useAtomValue(userProfileAtom);

  const clubs = userProfile?.golf_bag;
  const groundTypes = ["Tee-off", "Fairway", "Rough", "Sand", "Green"];
  const [newStroke, setNewStroke] = useState({
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

  const handleClubChange = (e) => {
    setNewStroke((prevState) => ({
      ...prevState,
      club: clubs[e.target.value],
    }));
  };

  const handleGroundChange = (e) => {
    setNewStroke((prevState) => ({
      ...prevState,
      ground: e.target.value,
    }));
  };

  const handleChipChange = () => {
    setNewStroke((prevState) => ({
      ...prevState,
      is_chip: !newStroke.is_chip,
    }));
  };

  const handleDirectionChange = (e) => {
    setNewStroke((prevState) => ({
      ...prevState,
      analysis: {
        ...newStroke.analysis,
        direction: e.target.value,
      },
    }));
  };

  const handleDistanceChange = (e) => {
    setNewStroke((prevState) => ({
      ...prevState,
      analysis: {
        ...newStroke.analysis,
        distance: e.target.value,
      },
    }));
  };

  const handleRemarksChange = (e) => {
    setNewStroke((prevState) => ({
      ...prevState,
      analysis: {
        ...prevState.analysis,
        remarks: e.target.value,
      },
    }));
  };

  const handleAddStroke = async () => {
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
    <div className="rounded-t-lg border border-solid border-white shadow-md">
      <div
        className="flex justify-center"
        onClick={() => setShowAddStroke(false)}
      >
        <h1 className="text-center text-white pl-2 my-3">Add new stroke</h1>
        <div className="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="w-5 h-5 fill-white"
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
          <fieldset className="col-span-3 grid grid-cols-6 grid-rows-2 text-white">
            {clubs.map((club, idx) => (
              <div key={club.serial}>
                <input
                  type="radio"
                  name="clubOption"
                  value={idx}
                  id={club.name}
                  className="peer hidden [&:checked_+_label_svg]:block"
                  checked={newStroke.club.serial === club.serial}
                  onChange={handleClubChange}
                />
                <label
                  htmlFor={club.name}
                  className="block cursor-pointer border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                >
                  <p className="text-gray-700">{club.abbrvName}</p>
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
                  checked={newStroke.ground === ground}
                  onChange={handleGroundChange}
                />
                <label
                  htmlFor={ground}
                  className="block cursor-pointer border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                >
                  <p className="text-gray-700">{ground}</p>
                </label>
              </div>
            ))}
          </fieldset>
          <div></div>
          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
              type="checkbox"
              value={newStroke.is_chip}
              id="isChipCheck"
              checked={newStroke.is_chip}
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
                  checked={newStroke.analysis.direction === direction}
                  onChange={handleDirectionChange}
                />
                <label
                  htmlFor={direction}
                  className="block cursor-pointer border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                >
                  <p className="text-gray-700">{direction}</p>
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
                  checked={newStroke.analysis.distance === distance}
                  onChange={handleDistanceChange}
                />
                <label
                  htmlFor={distance}
                  className="block cursor-pointer border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                >
                  <p className="text-gray-700">{distance}</p>
                </label>
              </div>
            ))}
          </fieldset>
        </div>

        <div className="px-3 grid grid-cols-4 gap-2 text-white pb-2">
          <h1>remarks</h1>
          <textarea
            id="remarksText"
            className="col-span-3 mt-2 border-gray-200 align-top shadow-sm text-sm font-medium text-gray-700"
            rows="4"
            value={newStroke.analysis.remarks}
            placeholder="Enter any additional remarks..."
            onChange={handleRemarksChange}
          ></textarea>
        </div>
      </>

      <button className="p-3 block bg-blue-300" onClick={handleAddStroke}>
        submit stroke
      </button>
    </div>
  );
};

export default NewStrokeForm;
