import { Outlet } from "react-router-dom";
import TopHeader from "../components/common/TopHeader";
import BottomNav from "../components/common/BottomNav";
import { useState } from "react";
import RoundListItem from "../components/record/ListItems/RoundListItem";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import nogamesimg from "../assets/images/golf-no-games.png";
import Loading from "../components/common/Loading";

const AnalysePage = () => {
  const [selectedRound, setSelectedRound] = useState({});
  const rounds = useLoaderData();

  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <TopHeader header="Analyse" />
        <div className="grow bg-gray-900 overflow-y-auto">
          {rounds.isLoading && <Loading />}
          {Object.keys(selectedRound).length > 0 ? (
            <Outlet />
          ) : rounds.length > 0 ? (
            <div className="w-full px-4 pt-4">
              {rounds?.map((round) => (
                <div key={round._id}>
                  <RoundListItem
                    key={round._id}
                    action={setSelectedRound}
                    link={`s/${round._id}`}
                    round={round}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <img src={nogamesimg} className="w-1/2 p-3" />
              <p className="text-center text-white italic text-sm">
                Looks like you have not recorded any rounds yet.
              </p>
              <div className="my-3 w-fit">
                <Link
                  to="/record/new"
                  className="block rounded-lg bg-teal-500 shadow-md shadow-teal-500/50 px-5 py-3 text-sm font-medium text-white"
                  type="button"
                >
                  Record New Game
                </Link>
              </div>
            </div>
          )}
        </div>
        <BottomNav />
      </div>
    </>
  );
};

export default AnalysePage;
