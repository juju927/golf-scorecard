import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import "./index.css";
import LoginForm from "./components/AuthPage/LoginForm";
import SignUpForm from "./components/AuthPage/SignUpForm";
import NewRoundPage from "./pages/NewRoundPage";
import RoundsPage from "./pages/RoundsPage";
import RoundRecordPage from "./pages/RoundRecordPage";
import HolePage from "./pages/HolePage";
import ScorecardPage from "./pages/ScorecardPage";
import AnalysePage from "./pages/AnalysePage";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <SignUpForm />,
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
  { path: "*", element: <ErrorPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);
