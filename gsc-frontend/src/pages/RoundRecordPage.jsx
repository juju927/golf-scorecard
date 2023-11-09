import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import TopHeader from "../components/common/TopHeader";

const RoundRecordPage = () => {
  return (
    <>
      <Navigate to="/record/rounds" />
      <div className="w-screen h-screen flex flex-col">
        <TopHeader header="Record" />
        <Outlet />
        <div>bottom nav</div>
      </div>
    </>
  );
};

export default RoundRecordPage;
