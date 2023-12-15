import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Toaster } from "react-hot-toast";
import { SimpleDialogContainer } from 'react-simple-dialogs'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <SimpleDialogContainer />
    <App /> 
  </React.StrictMode>
);