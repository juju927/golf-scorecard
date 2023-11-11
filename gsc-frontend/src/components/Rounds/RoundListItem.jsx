import { useSetAtom } from "jotai";
import { currentRoundRecordAtom } from "../../utilities/atom";
import { useNavigate } from "react-router-dom";
import * as dayjs from "dayjs"

const RoundListItem = ({ round }) => {
  const setCurrentRound = useSetAtom(currentRoundRecordAtom);
  const navigate = useNavigate();

  const handleClick = () => {
    setCurrentRound(round);
    navigate(`/record/hole/${round.round_record[0].hole_num}`);
  };

  return (
    <>
      <div
        className="w-full h-fit rounded-lg my-2 bg-teal-800"
        onClick={handleClick}
      >
        <p className="py-2 pl-4">
          <strong className="text-white">{round?.course.course_name}</strong>
          <span className="block text-xs italic text-slate-300">{dayjs(round?.date).format('D MMM YYYY')}</span>

        </p>
      </div>
    </>
  );
};

export default RoundListItem;
