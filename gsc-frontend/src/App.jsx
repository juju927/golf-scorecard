import { Toaster } from "react-hot-toast"

import "./App.css";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <div className="w-screen h-screen">
        <Toaster />
        <HomePage />
      </div>
    </>
  );
}

export default App;
