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
        className="w-screen h-300 block rounded-lg border px-2 my-2"
        onClick={handleClick}
      >
        <h1>{round?.course.course_name}</h1>
        <h3>{dayjs(round?.date).format('D MMM YYYY')}</h3>
      </div>
    </>
  );
};

export default RoundListItem;
