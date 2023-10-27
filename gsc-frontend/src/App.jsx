import { Toaster } from "react-hot-toast";

import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <div className="min-w-screen min-h-screen bg-white dark:bg-gray-900">
        <Toaster />
        <HomePage />
      </div>
    </>
  );
}

export default App;
