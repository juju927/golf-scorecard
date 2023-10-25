import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage"
import AuthPage from "./pages/AuthPage"
import "./index.css";
import LoginForm from "./components/AuthPage/LoginForm";
import SignUpForm from "./components/AuthPage/SignUpForm";
import NewRecordPage from "./pages/NewRecordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "accounts",
    element: <AuthPage />,
    children: [
      {
        path: "login",
        element: <LoginForm />
      },
      {
        path: "register",
        element: <SignUpForm />
      }
    ]
  },
  {
    path: "record",
    element: <NewRecordPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
