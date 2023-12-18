import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { addStrokeService } from "../../../utilities/rounds-service";
import { useSetAtom } from "jotai";
import { currentRoundRecordAtom } from "../../../utilities/atom";
import { AiOutlineClose } from "react-icons/ai";
import GroundTypeSelect from "../StrokeFormInputs/GroundTypeSelect";
import GolfClubSelect from "../StrokeFormInputs/GolfClubSelect";
import ChipCheck from "../StrokeFormInputs/ChipCheck";
import DirectionInput from "../StrokeFormInputs/DirectionInput";
import DistanceInput from "../StrokeFormInputs/DistanceInput";
import RemarksInput from "../StrokeFormInputs/RemarksInput";
import { TbGolf } from "react-icons/tb";
import Loading from "../../common/Loading";
import PenaltyInput from "../StrokeFormInputs/PenaltyInput";

const NewStrokeForm = ({
  roundId,
  recordId,
  total_strokes,
  setShowAddStroke,
  endHole,
}) => {
  const setCurrentRound = useSetAtom(currentRoundRecordAtom);

  const [newStroke, setNewStroke] = useState({
    round_id: roundId,
    round_record_id: recordId,
    is_chip: false,
    penalty: {},
    club: "",
    ground: total_strokes == 0 ? "Tee-off" : "",
    analysis: {
      direction: "",
      distance: "",
      remarks: "",
    },
  });
  const [isLoading, setIsLoading] = useState({
    next: false,
    end: false,
  });

  const handleAddStroke = async (end) => {
    if (!newStroke.club || !newStroke.ground) {
      toast.error("Please add stroke details.");
      return;
    }
    try {
      if (end) {
        setIsLoading((prevState) => ({
          ...prevState,
          end: true,
        }));
        await addStrokeService(newStroke);
        await endHole();
        setShowAddStroke(false);
      } else {
        setIsLoading((prevState) => ({
          ...prevState,
          next: true,
        }));
        const updatedRound = await addStrokeService(newStroke);
        resetForm();
        setCurrentRound(updatedRound);
        toast.success("Stroke added!");
      }
    } catch (err) {
      toast.error(`${err.message}`);
    } finally {
      setIsLoading((prevState) => ({
        ...prevState,
        next: false,
        end: false,
      }));
    }
  };

  const resetForm = () => {
    setNewStroke({
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
  };

  useEffect(() => {
    setNewStroke((prevState) => ({
      ...prevState,
      round_id: roundId,
      round_record_id: recordId,
    }));
  }, [roundId, recordId]);

  return (
    <div className="absolute top-0 left-0 w-screen h-screen overflow-y-auto z-10 bg-gray-900/10 flex items-end justify-center">
      <div className="relative w-full h-10/12 shadow-md rounded-lg border border-black bg-gray-900">
        <div className="flex justify-center bg-black border-b border-white shadow-md">
          <h1 className="text-center text-white my-3 text-lg tracking-wide font-semibold">
            Adding{" "}
            <span className="ordinal">
              {total_strokes + 1}
              {total_strokes + 1 == 1 && "st"}
              {total_strokes + 1 == 2 && "nd"}
              {total_strokes + 1 == 3 && "rd"}
              {total_strokes + 1 > 3 && "th"}
            </span>{" "}
            stroke
          </h1>
        </div>

        <div
          className="absolute right-3 top-3 flex justify-center items-center"
          onClick={() => setShowAddStroke(false)}
        >
          <AiOutlineClose className="text-white w-6 h-6" />
        </div>

        <div className="px-2 pt-4 flex flex-col gap-3">
          <div>
            <h1 className="pb-2 text-white text-xs uppercase">
              stroke details
            </h1>

            <div className="w-full grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-1">
              <GroundTypeSelect stroke={newStroke} setStroke={setNewStroke} />

              <GolfClubSelect stroke={newStroke} setStroke={setNewStroke} />
              <PenaltyInput stroke={newStroke} setStroke={setNewStroke} />
              <ChipCheck stroke={newStroke} setStroke={setNewStroke} />
            </div>
          </div>

          <div>
            <h1 className="text-white text-xs uppercase">stroke analysis</h1>
            <p className="pb-2 text-xs text-gray-400 font-light tracking-tight">
              Stroke analysis is optional.
            </p>

            <DirectionInput stroke={newStroke} setStroke={setNewStroke} />
            <DistanceInput stroke={newStroke} setStroke={setNewStroke} />
          </div>

          <div>
            <h1 className="pb-2 text-white text-xs uppercase">stroke remarks</h1>
            <RemarksInput stroke={newStroke} setStroke={setNewStroke} />
          </div>

          <div className="w-full py-2 px-4 flex flex-row-reverse justify-between">
            <button
              disabled={isLoading.next || isLoading.end}
              className="w-1/2 h-fit px-3 py-2 rounded-lg bg-teal-700 text-white font-semibold border border-teal-500 uppercase"
              onClick={() => handleAddStroke(false)}
            >
              <div className="flex items-center justify-center">
                {isLoading.next ? <Loading /> : <span>next stroke</span>}
              </div>
            </button>
            <button
              disabled={isLoading.next || isLoading.end}
              className="w-5/12 h-fit px-3 py-2 rounded-lg bg-teal-700 text-white font-semibold border border-teal-500 uppercase"
              onClick={() => handleAddStroke(true)}
            >
              <div className="flex items-center justify-center gap-2">
                {isLoading.end ? (
                  <Loading />
                ) : (
                  <>
                    <TbGolf />
                    <span>end hole</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStrokeForm;
