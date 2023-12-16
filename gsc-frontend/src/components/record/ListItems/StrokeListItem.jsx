import { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import { deleteStrokeService } from "../../../utilities/rounds-service";
import { useSetAtom } from "jotai";
import { currentRoundRecordAtom } from "../../../utilities/atom";
import toast from "react-hot-toast";
import { simpleConfirm } from 'react-simple-dialogs'
import EditStrokeForm from "../StrokeForms/EditStrokeForm";

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
    setShowEditStroke(true);
    setShowMenu(false);
  }

  const handleDeleteClick = async () => {
    if (
      await simpleConfirm({
        title: "Delete stroke?",
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel'
      })
    ) {
      deleteStroke();
    } 
  }

  return (
    <>
      <div className="w-full pl-4 px-2 py-2 flex">
        <p>{idx + 1}</p>
        
        <div className="flex flex-col gap">
          <p className="font-bold text-white">{stroke.ground}</p>
          <p className="pl-2 italic text-xs text-gray-300">
            {stroke.club.name}
          </p>
        </div>
        <div className="grow flex gap-2 justify-end items-center">
          <div
            className="triple-dot relative"
            onClick={() => setShowMenu(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="w-6 h-6 fill-gray-300"
            >
              <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
            </svg>

            <div
              className={`z-10 stroke-menu w-32 rounded-lg px-3 py-1 bg-gray-800 shadow-gray-700/30 absolute right-2 top-0 ${
                !showMenu && "hidden"
              }`}
              ref={ref}
            >
              <div className="flex flex-col divide-y divide-slate-500/50">
                <div className="grid grid-cols-4 items-center py-2" onClick={handleEditClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="w-5 h-5 fill-slate-500"
                  >
                    <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                  </svg>
                  <span className="text-sm capitalize text-white col-span-3 ml-3">
                    edit
                  </span>
                </div>

                <div
                  className="grid grid-cols-4 items-center py-2"
                  onClick={handleDeleteClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="w-5 h-5 fill-slate-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>

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
