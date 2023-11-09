import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage"
import "./index.css";
import LoginForm from "./components/AuthPage/LoginForm";
import SignUpForm from "./components/AuthPage/SignUpForm";
import NewRoundPage from "./pages/NewRoundPage";
import RoundsPage from "./pages/RoundsPage";
import RoundRecordPage from "./pages/RoundRecordPage";
import HolePage from "./pages/HolePage";
import { Toaster } from "react-hot-toast";
// import { getRoundService } from "./utilities/rounds-service";
// import HolePage from "./pages/HolePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
        element: <NewRoundPage />
      },
      {
        path: "rounds",
        element: <RoundsPage />
      },
      {
        path: "hole/:holeNo",
        element: <HolePage />
      }      
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);
