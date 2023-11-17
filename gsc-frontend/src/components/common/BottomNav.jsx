import { useAtomValue } from "jotai";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { userAtom } from "../../utilities/atom";
import { logOutService } from "../../utilities/users-service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BottomNav = () => {
  const location = useLocation();
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const handleLogout = async () => {
    try {
      await logOutService()
      navigate("/login")
    } catch (err) {
      toast.error(`Error logging out: ${err.message}`)
    }
  }

  return (
    <div className="h-12 bg-teal-100 border-t border-teal-600 border-solid shrink-0 dark:text-white dark:bg-black">
      <nav className="h-full max-w-full grid grid-cols-5 gap-x-8 justify-between place-items-center px-3">
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-8 h-8 stroke-2 ${
              location.pathname == "/" ? "stroke-teal-300" : "stroke-current"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>

        <Link to="/analyse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-8 h-8 stroke-2 ${
              location.pathname == "/analyse"
                ? "stroke-teal-300"
                : "stroke-current"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
            />
          </svg>
        </Link>

        <Link to="/record">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-8 h-8 stroke-2 ${
              location.pathname.startsWith("/record")
                ? "stroke-teal-300"
                : "stroke-current"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </Link>

        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-8 h-8 stroke-2 ${
              location.pathname.startsWith("/remember")
                ? "stroke-teal-300"
                : "stroke-current"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
            />
          </svg>
        </Link>

        <div className="relative">
          <img
            alt={user?.profile?.username}
            src={user?.profile?.profile_picture}
            className="h-8 w-8 rounded-full object-cover"
            onClick={()=> setShowProfileMenu(!showProfileMenu)}
          />

          <div className={`profile-menu w-32 rounded-lg absolute bottom-12 right-0 px-3 py-1 bg-gray-700/80 shadow-md shadow-gray-700/30 ${!showProfileMenu && "hidden"}`}>
            <div className="flex flex-col divide-y divide-slate-500/50">
              <Link to="/profile" className="grid grid-cols-4 items-center py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 stroke-2 stroke-white fill-none justify-self-center"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm capitalize text-white col-span-3 ml-3">settings</span>
              </Link>

              <div className="grid grid-cols-4 items-center py-2" onClick={handleLogout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 stroke-2 stroke-red-600 fill-none justify-self-center"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                <span className="text-sm capitalize text-red-600 col-span-3 ml-3">log out</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;
