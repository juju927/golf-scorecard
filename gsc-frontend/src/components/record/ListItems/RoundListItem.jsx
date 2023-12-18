import dayjs from "dayjs";
import { AiOutlineDelete } from "react-icons/ai";
import {
  deleteRoundService,
  getUserRoundsService,
} from "../../../utilities/rounds-service";
import toast from "react-hot-toast";
import { simpleConfirm } from "react-simple-dialogs";
import { useSetAtom } from "jotai";
import { userRoundsAtom } from "../../../utilities/atom";
import { useNavigate } from "react-router-dom";

const RoundListItem = ({ round, action, link }) => {
  const setUserRoundsAtom = useSetAtom(userRoundsAtom);
  const navigate = useNavigate()

  const deleteRound = async () => {
    try {
      await deleteRoundService({
        round_id: round._id,
      });
      const userRounds = await getUserRoundsService();
      setUserRoundsAtom(userRounds);
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    if (await simpleConfirm("Delete round?")) {
      deleteRound();
    }
  };

  const handleClick = async () => {
    if (action) {
      action(round)
    }
    navigate(link)
  }

  return (
    <div className="w-full h-fit flex py-2 px-4 justify-center">
      <p className="grow" onClick={handleClick}>
          <strong className="text-white">{round?.course.course_name}</strong>
          <span className="block text-xs italic text-slate-300">
            {dayjs(round?.date).format("D MMM YYYY")}
          </span>
      </p>

      <div className="p-2"
        onClick={(e) => handleDeleteClick(e)}
      >
        <AiOutlineDelete className="text-slate-300" />
      </div>
    </div>
  );
};

export default RoundListItem;
