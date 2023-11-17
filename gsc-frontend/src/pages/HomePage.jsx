import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "../utilities/atom";
import { Navigate } from "react-router-dom";
import TopHeader from "../components/common/TopHeader";
import BottomNav from "../components/common/BottomNav";

const HomePage = () => {
  const user = useAtomValue(userAtom);

  return (
    <div className="w-screen h-screen flex flex-col">
      {!user && <Navigate to="/login" replace={true} />}

      <TopHeader header="golf buddy" />

      <div className="max-w-full grow overflow-y-auto bg-gray-900">
        <div className="flex flex-col text-center pt-4 items-center">
          <h1 className="text-2xl font-bold text-white">
            Welcome Back, {user?.username}!
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Go hit some good shots today! 🎉
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
      </div>

      <BottomNav />
    </div>
  );
};

export default HomePage;
