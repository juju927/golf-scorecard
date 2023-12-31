import { Outlet } from "react-router-dom";
import TopHeader from "../components/common/TopHeader";
import RoundListItem from "../components/record/ListItems/RoundListItem";
import { useAtomValue } from "jotai";
import { userRoundsAtom } from "../utilities/atom";
import { Link } from "react-router-dom";
import nogamesimg from "../assets/images/golf-no-games.png";
import Loading from "../components/common/Loading";
import { useLocation } from "react-router-dom";

const AnalysePage = () => {
  const rounds = useAtomValue(userRoundsAtom)
  const location = useLocation();

  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        {location.pathname == "/analyse" && <TopHeader header="Analyse" />}
        <div className="grow bg-gray-900 overflow-y-auto">
          {rounds.isLoading && <Loading />}

          {location.pathname == "/analyse" ? (
            rounds.length > 0 ? (
              <div className="w-full px-4 pt-4">
                {rounds?.map((round) => (
                  <div key={round._id}>
                    <RoundListItem
                      key={round._id}
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
            )
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </>
  );
};

export default AnalysePage;
