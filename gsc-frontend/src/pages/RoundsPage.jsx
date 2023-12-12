import { useSetAtom } from "jotai";
import { currentRoundRecordAtom } from "../utilities/atom";
import { useState } from "react";
import { useEffect } from "react";
import { getUserRoundsService } from "../utilities/rounds-service";
import toast from "react-hot-toast";
import RoundListItem from "../components/rounds/RoundListItem";
import { Link } from "react-router-dom";
import * as dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const RoundsPage = () => {
  const setCurrentRound = useSetAtom(currentRoundRecordAtom);
  const [todayRounds, setTodayRounds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserRounds = async () => {
      try {
        const rounds = await getUserRoundsService();
        const filteredRounds = rounds.filter(
          (round) =>
            dayjs(round?.date).format("D MMM YYYY") ==
            dayjs(Date.now()).format("D MMM YYYY")
        );
        if (filteredRounds.length == 0) {
          navigate("/record/new");
          return;
        }
        setTodayRounds(filteredRounds);
      } catch (err) {
        toast.error(`${err.message}`);
      }
    };
    getUserRounds();
  }, []);

  return (
    <div className="w-full px-4 pt-4">
      {todayRounds.length > 0 && (
        <span className="text-xs text-gray-500 uppercase font-bold">
          Continue recording from:
        </span>
      )}

      {todayRounds?.map((round) => (
        <div key={round._id}>
            <RoundListItem
              key={round._id}
              round={round}
              action={setCurrentRound}
              link={`/record/hole/${round.round_record[0].hole_num}`}
            />
        </div>
      ))}

      <div className="my-3 mx-auto w-fit">
        <Link
          to="/record/new"
          className="block rounded-lg bg-teal-500 shadow-md shadow-teal-500/50 px-5 py-3 text-sm font-medium text-white"
          type="button"
        >
          Record New Game
        </Link>
      </div>
    </div>
  );
};

export default RoundsPage;
