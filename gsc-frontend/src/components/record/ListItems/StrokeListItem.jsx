import { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import { deleteStrokeService } from "../../../utilities/rounds-service";
import { useSetAtom } from "jotai";
import { currentRoundRecordAtom } from "../../../utilities/atom";
import toast from "react-hot-toast";
import { simpleConfirm } from "react-simple-dialogs";
import EditStrokeForm from "../StrokeForms/EditStrokeForm";
import PenaltyTag from "./SummaryTags/PenaltyTag";
import RemarksTag from "./SummaryTags/RemarksTag";
import { AiOutlineMore } from "react-icons/ai";
import { GoPencil, GoTrash } from "react-icons/go";

const StrokeListItem = ({ stroke, round_id, round_record_id, idx }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditStroke, setShowEditStroke] = useState(false);
  const ref = useClickAway(() => {
    setShowMenu(false);
  });
  const setCurrentRound = useSetAtom(currentRoundRecordAtom);

  const deleteStroke = async () => {
    try {
      const updatedRound = await deleteStrokeService({
        round_id: round_id,
        round_record_id: round_record_id,
        stroke_id: stroke._id,
      });
      setCurrentRound(updatedRound);
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  const handleEditClick = () => {
    setShowMenu(false);
    setShowEditStroke(true);
  };

  const handleDeleteClick = async () => {
    if (
      await simpleConfirm({
        title: "Delete stroke?",
        confirmLabel: "Delete",
        cancelLabel: "Cancel",
      })
    ) {
      deleteStroke();
    }
  };

  return (
    <>
      <div className="w-full pl-4 px-2 py-2 flex gap-3">
        <p className="text-white text-xl font-medium font-serif tabular-nums">
          {idx + 1}.
        </p>

        <div className="grow flex gap-2">
          <div className="flex flex-col">
            <div
              className={`uppercase text-lg ${
                stroke.ground == "Tee-off" && "text-green-400"
              } ${stroke.ground == "Fairway" && "text-green-500"} ${
                stroke.ground == "Green" && "text-green-300"
              } ${stroke.ground == "Rough" && "text-green-600"} ${
                stroke.ground == "Sand" && "text-stone-400"
              }`}
            >
              {stroke.ground}
            </div>
            <p className="italic text-xs text-gray-300">{stroke.club?.name}</p>
          </div>

          <div className="tag-list flex gap-2">
            <PenaltyTag penalty={stroke.penalty} />
            <RemarksTag remarks={stroke.analysis?.remarks} />
          </div>
        </div>
        <div className="flex justify-end items-center">
          <div
            className="triple-dot relative"
            onClick={() => setShowMenu(true)}
          >
            <AiOutlineMore className="text-xl text-white font-bold" />
            <div
              className={`z-10 stroke-menu w-32 rounded-lg px-3 py-1 bg-gray-800 shadow-gray-700/30 absolute right-2 top-0 ${
                !showMenu && "hidden"
              }`}
              ref={ref}
            >
              <div className="flex flex-col divide-y divide-slate-500/50">
                <div
                  className="grid grid-cols-4 items-center py-2"
                  onClick={handleEditClick}
                >
                  <GoPencil className="text-slate-500 text-xl" />
                  <span className="text-sm capitalize text-white col-span-3 ml-3">
                    edit
                  </span>
                </div>

                <div
                  className="grid grid-cols-4 items-center py-2"
                  onClick={handleDeleteClick}
                >
                  <GoTrash className="text-slate-500 text-xl" />
                  <span className="text-sm capitalize text-white col-span-3 ml-3">
                    delete
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEditStroke && (
        <EditStrokeForm
          stroke={stroke}
          round_id={round_id}
          round_record_id={round_record_id}
          setShowEditStroke={setShowEditStroke}
          idx={idx}
        />
      )}
    </>
  );
};

export default StrokeListItem;
