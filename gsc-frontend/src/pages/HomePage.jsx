import { Link } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import {
  userAtom,
  userProfileAtom,
  userRoundsAtom,
  currentRoundRecordAtom,
} from "../utilities/atom";
import { Navigate } from "react-router-dom";
import TopHeader from "../components/common/TopHeader";
import BottomNav from "../components/common/BottomNav";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import golfBag from "../assets/images/golf-bag.png";
import dayjs from "dayjs";
import RoundListItem from "../components/record/ListItems/RoundListItem";
import newGame from "../assets/images/newGame.png";
import editGolfBag from "../assets/images/editGolfBag.png"
import analyseScorecard from "../assets/images/analyseScorecard.png"

const HomePage = () => {
  const user = useAtomValue(userAtom);
  const userProfile = useAtomValue(userProfileAtom);
  const setUserRoundsAtom = useSetAtom(userRoundsAtom);
  const setCurrentRound = useSetAtom(currentRoundRecordAtom);
  const userRounds = useLoaderData();
  const [todayRounds, setTodayRounds] = useState([]);
  const quickActions = [
    {
    label: "new game",
    img: newGame,
    link: "/record/new"
  },
    {
    label: "edit bag",
    img: editGolfBag,
    link: "/profile"
  },
    {
    label: "last game summary",
    img: analyseScorecard,
    link: `/analyse/s/${userRounds[0]._id}`
  },
  //   {
  //   label: "new game",
  //   img: newGame,
  //   link: "/record/new"
  // },
]


  useEffect(() => {
    setUserRoundsAtom(userRounds);
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
          {userProfile?.golf_bag?.length == 0 ? (
            <>
              <img src={golfBag} className="w-1/2 h-1/2 max-w-100" />
              <p className="mt-1.5 text-sm text-gray-500">
                Looks like you have not set up your profile yet.
              </p>
              <div className="my-3 w-fit">
                <Link
                  to="/profile"
                  className="block rounded-lg bg-teal-500 shadow-md shadow-teal-500/50 px-5 py-3 text-sm font-medium text-white"
                  type="button"
                >
                  Set up profile
                </Link>
              </div>
            </>
          ) : (
            <p className="self-start mt-1.5 text-sm text-gray-500">
              Go hit some good shots today! 🎉
            </p>
          )}
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
            { quickActions.map((quickAction, idx)=> (
              <div key={idx} className="w-full h-fit flex flex-col items-center justify-center">
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

          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default HomePage;
