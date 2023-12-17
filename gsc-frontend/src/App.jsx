import "./App.css";
import LoginForm from "./components/AuthPage/LoginForm";
import SignUpForm from "./components/AuthPage/SignUpForm";
import NewRoundPage from "./pages/NewRoundPage";
import RoundsPage from "./pages/RoundsPage";
import RoundRecordPage from "./pages/RoundRecordPage";
import HolePage from "./pages/HolePage";
import ScorecardPage from "./pages/ScorecardPage";
import AnalysePage from "./pages/AnalysePage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import Base from "./pages/Base";
import { getUserRoundsLoader, getGolfClubsLibraryLoader } from "./loaders/loaders";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "./utilities/atom";


function App() {
  const user = useAtomValue(userAtom)

  const routes = [
    {
      path: "login",
      element: <LoginForm />,
    },
    {
      path: "register",
      element: <SignUpForm />,
    },
  ];

  const privateRoutes = [
    {
      path: "home",
      element: <HomePage />,
    },
    {
      path: "record",
      element: <RoundRecordPage />,
      children: [
        {
          path: "new",
          element: <NewRoundPage />,
        },
        {
          path: "rounds",
          element: <RoundsPage />,
        },
        {
          path: "hole/:holeNo",
          element: <HolePage />,
        },
      ],
    },
    {
      path: "analyse",
      element: <AnalysePage />,
      loader: getUserRoundsLoader,
      children: [
        {
          path: "s/:roundId",
          element: <ScorecardPage />,
        },
      ],
    },
    {
      path: "profile",
      element: <ProfilePage />,
      loader: getGolfClubsLibraryLoader,
    },
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Base />,
      errorElement: <ErrorPage />,
      children: user ? [...privateRoutes, ...routes] : routes,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
