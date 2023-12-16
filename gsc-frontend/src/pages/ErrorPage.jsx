import { useAtomValue } from "jotai";
import { Link } from "react-router-dom";
import { userAtom } from "../utilities/atom";
import { Navigate } from "react-router-dom";

const ErrorPage = () => {
  const user = useAtomValue(userAtom);

  return (
    <>
      {user ? (
        <div className="grid h-screen px-4 bg-white place-content-center dark:bg-gray-900">
          <div className="text-center">
            <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Uh-oh!
            </h1>

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Something went wrong.
            </p>

            <Link
              to="/home"
              className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default ErrorPage;
