import { Link } from "react-router-dom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  userAtom,
  userProfileAtom,
  userRoundsAtom,
  currentRoundRecordAtom,
} from "../utilities/atom";
import { Navigate } from "react-router-dom";
import TopHeader from "../components/common/TopHeader";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import RoundListItem from "../components/record/ListItems/RoundListItem";
import newGame from "../assets/images/newGame.png";
import editGolfBag from "../assets/images/editGolfBag.png";
import analyseScorecard from "../assets/images/analyseScorecard.png";
import logOut from "../assets/images/logOut.png";
import { logOutService } from "../utilities/users-service";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [user, setUser] = useAtom(userAtom);
  const userProfile = useAtomValue(userProfileAtom);
  const [userRounds, setUserRounds] = useAtom(userRoundsAtom);
  const setCurrentRound = useSetAtom(currentRoundRecordAtom);
  const loaderUserRounds = useLoaderData();
  const [todayRounds, setTodayRounds] = useState([]);
  const quickActions = [
    {
      label: "new game",
      img: newGame,
      link: "/record/new",
    },
    {
      label: "review",
      img: analyseScorecard,
      link: "/analyse",
    },
    {
      label: "edit profile",
      img: editGolfBag,
      link: "/profile",
    },
  ];
  const navigate = useNavigate();

  const handleLogout = async () => {
    logOutService();
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    setUserRounds(loaderUserRounds);
  }, [loaderUserRounds]);

  useEffect(() => {
    const filteredRounds = userRounds.filter(
      (round) =>
        dayjs(round?.date).format("D MMM YYYY") ==
        dayjs(Date.now()).format("D MMM YYYY")
    );
    setTodayRounds(filteredRounds);
  }, [userRounds]);

  return (
    <div className="w-screen h-screen flex flex-col">
      {!user && <Navigate to="/login" replace={true} />}

      <TopHeader header="golf buddy" />

      <div className="max-w-full grow overflow-y-auto bg-gray-900">
        <div className="flex flex-col text-center pt-4 px-3 items-center">
          <h1 className="self-start text-2xl font-bold text-white">
            Hello, {userProfile?.display_name || user?.username}!
          </h1>
          {/* {userProfile?.golf_bag?.length == 0 && <Navigate to="/setup" /> } */}
            
            <p className="self-start mt-1.5 text-sm text-gray-500">
              Go hit some good shots today! 🎉
            </p>
          
        </div>
        <div className="w-full px-4 pt-4">
          {todayRounds.length > 0 && (
            <div className="text-lg text-teal-300 font-bold rounded-t-lg">
              <span>Continue recording</span>
            </div>
          )}

          {todayRounds?.map((round) => (
            <div key={round._id} className="bg-teal-800 rounded-lg">
              <RoundListItem
                key={round._id}
                round={round}
                action={setCurrentRound}
                link={`/record/hole/${round.round_record[0].hole_num}`}
              />
            </div>
          ))}

          <div className="grid grid-cols-4 pt-8">
            {quickActions.map((quickAction, idx) => (
              <div
                key={idx}
                className="w-full h-fit flex flex-col items-center justify-center"
              >
                <Link
                  to={quickAction.link}
                  className="block w-fit rounded-lg bg-teal-500 p-3"
                  type="button"
                >
                  <img src={quickAction.img} className="w-10" />
                </Link>
                <span className="text-center text-xs font-medium text-white">
                  {quickAction.label}
                </span>
              </div>
            ))}
            <div
              className="w-full h-fit flex flex-col items-center justify-center"
              onClick={handleLogout}
            >
              <div className="block w-fit rounded-lg bg-teal-500 p-3">
                <img src={logOut} className="w-10" />
              </div>
              <span className="text-center text-xs font-medium text-white">
                log out
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
