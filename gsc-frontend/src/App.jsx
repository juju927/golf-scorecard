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
import { getUserRoundsLoader } from "./loaders/loaders";
import { createBrowserRouter } from "react-router-dom";
import { getUser } from "./utilities/users-service";
import { RouterProvider } from "react-router-dom";


function App() {
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
    },
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Base />,
      errorElement: <ErrorPage />,
      children: getUser() ? [...privateRoutes, ...routes] : routes,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
