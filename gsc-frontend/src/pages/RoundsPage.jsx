import { useAtomValue } from "jotai";
import { currentRoundRecordAtom } from "../utilities/atom";
import { useState } from "react";
import { useEffect } from "react";
import { getUserRoundsService } from "../utilities/rounds-service";
import toast from "react-hot-toast";
import RoundListItem from "../components/Rounds/RoundListItem";
import { Link } from "react-router-dom";

const RoundsPage = () => {
  const currentRound = useAtomValue(currentRoundRecordAtom);
  const [allRounds, setAllRounds] = useState([]);

  useEffect(() => {
    const getUserRounds = async () => {
      try {
        const rounds = await getUserRoundsService();
        setAllRounds(rounds);
      } catch (err) {
        toast.error(`${err.message}`);
      }
    };
    getUserRounds();
  }, []);

  return (
    <div className="w-full px-4">
      <div className="my-3 mx-auto w-fit">
        <Link
          to="/record/new"
          className="block rounded-lg bg-teal-500 px-5 py-3 text-sm font-medium text-white"
          type="button"
        >
          Record New Game
        </Link>
      </div>

      <h1 className="text-base text-white">... or continue recording from:</h1>
      {Object.keys(currentRound) < 1 && (
        <div>
          {allRounds.map((round) => (
            <RoundListItem key={round._id} round={round} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoundsPage;
