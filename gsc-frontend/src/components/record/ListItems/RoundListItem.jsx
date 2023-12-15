import dayjs from "dayjs";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteRoundService } from "../../../utilities/rounds-service";
import toast from "react-hot-toast";
import { simpleConfirm } from "react-simple-dialogs";
import { Link } from "react-router-dom";

const RoundListItem = ({ round, action, link }) => {
  const deleteRound = async () => {
    try {
      await deleteRoundService({
        round_id: round._id,
      });
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

  return (
    <div className="w-full h-fit border-b border-slate-300/50 flex py-2 pl-4">
      <p className="grow" onClick={() => action(round)}>
        <Link to={link}>
          <strong className="text-white">{round?.course.course_name}</strong>
          <span className="block text-xs italic text-slate-300">
            {dayjs(round?.date).format("D MMM YYYY")}
          </span>
        </Link>
      </p>

      <div
        className="justify-end items-center"
        onClick={(e) => handleDeleteClick(e)}
      >
        <AiOutlineDelete className="text-slate-300" />
      </div>
    </div>
  );
};

export default RoundListItem;
