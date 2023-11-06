import { useState } from "react";
import { addStrokeAPI } from "../../utilities/rounds-api";
import toast from "react-hot-toast";
import { useEffect } from "react";

const NewStrokeForm = ({ roundId, recordId }) => {
  const clubs = ["1W", "3W", "5W", "5i", "6i", "7i", "W53", "PW", "Pt"];
  const groundTypes = ["Tee-off", "Fairway", "Rough", "Sand", "Green"]
  const [newStroke, setNewStroke] = useState({
    round_id: roundId,
    record_id: recordId,
    is_penalty: false,
    is_chip: false,
    club: "",
    ground: "Tee-off",
    analysis: {
      is_left: false,
      is_right: false,
      is_long: false,
      is_short: false,
      remarks: ""
    }
  });

  const handleClubChange = (e) => {
    setNewStroke((prevState) => ({
      ...prevState,
      club: e.target.value,
    }));
  };

  const handleGroundChange = (e) => {
    setNewStroke((prevState) => ({
      ...prevState,
      ground: e.target.value,
    }))
  }

  const handleAddStroke = async () => {
    try {
      await addStrokeAPI(newStroke)
      
    } catch (err) {
      toast.error(`${err.message}`)
    }
  }

  useEffect(()=> {
    setNewStroke((prevState) => ({
      ...prevState,
      round_id: roundId,
      record_id: recordId
    }))
  }, [roundId, recordId])

  return (
    <>
      <div className="w-screen h-fit rounded-t-lg border border-solid border-white shadow-md">
        <h1 className="text-white pl-2 my-3">Add new stroke</h1>

        <div className="px-3 grid grid-cols-4 gap-2 py-2">
          <h1>club</h1>
          <fieldset className="col-span-3 grid grid-cols-6 grid-rows-2 text-white">
            {clubs.map((club) => (
              <div key={club}>
                <input
                  type="radio"
                  name="clubOption"
                  value={club}
                  id={club}
                  className="peer hidden [&:checked_+_label_svg]:block"
                  checked={newStroke.club === club}
                  onChange={handleClubChange}
                />
                <label
                  htmlFor={club}
                  className="block cursor-pointer border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                >
                  <p className="text-gray-700">{club}</p>
                </label>
              </div>
            ))}
          </fieldset>
        </div>

        <div className="px-3 grid grid-cols-4 gap-2">
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
        </div>

        <div className="px-3 grid grid-cols-4 gap-2">
          <h1>analysis</h1>
          {/* <fieldset className="col-span-3 grid grid-cols-3 grid-cols-3 text-white">
              <div>
              <input
                  type="radio"
                  name="analysisOption"
                  value=
                  id={club}
                  className="peer hidden [&:checked_+_label_svg]:block"
                  checked={newStroke.club === club}
                  onChange={handleClubChange}
                />
                <label
                  htmlFor={club}
                  className="block cursor-pointer border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                >
                  <p className="text-gray-700">{club}</p>
                </label>
              </div>
          </fieldset> */}
        </div>

        <button className="p-3 block bg-blue-300" onClick={handleAddStroke}>submit stroke</button>
      </div>
    </>
  );
};

export default NewStrokeForm;
