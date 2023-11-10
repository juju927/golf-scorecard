import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "../utilities/atom";
import { Navigate } from "react-router-dom";
import TopHeader from "../components/common/TopHeader";
import BottomNav from "../components/common/BottomNav";

const HomePage = () => {
  const user = useAtomValue(userAtom)

  return (
    <div className="w-screen h-screen flex flex-col dark:bg-gray-900">
      { !user && <Navigate to="/login" replace={true} /> }
      
      <TopHeader header="golf buddy" />


      <div className="max-w-full grow overflow-y-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Welcome Back, {user?.username}!
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Let's hit some good shots today! 🎉
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <Link to="/record/new"
              className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
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
