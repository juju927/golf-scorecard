import { useAtomValue } from "jotai";
import { Outlet } from "react-router-dom";
import { currentRoundRecordAtom } from "../utilities/atom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getUserRoundsService } from "../utilities/rounds-service";
import toast from "react-hot-toast";
import RoundListItem from "../components/Rounds/RoundListItem";


const RoundsPage = () => {
  const currentRound = useAtomValue(currentRoundRecordAtom);

  const navigate = useNavigate();

  const [allRounds, setAllRounds] = useState([]);

  useEffect(() => {
    const getUserRounds = async () => {
      try {
        const rounds = await getUserRoundsService("6537f5eca38f93076fa41eac");
        setAllRounds(rounds);
      } catch (err) {
        toast.error(`${err.message}`);
      }
    };

    getUserRounds();
  }, []);

  return (
    <>
      {Object.keys(currentRound) < 1 && (
        <div>
          <button onClick={() => navigate("/rounds/new")}>new</button>
          {allRounds.map((round) => (
            <RoundListItem key={round._id} round={round} />
          ))}
        </div>
      )}

      <Outlet />
    </>
  );
};

export default RoundsPage;
