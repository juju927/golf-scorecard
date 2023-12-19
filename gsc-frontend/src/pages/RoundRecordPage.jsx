import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import TopHeader from "../components/common/TopHeader";
import { useLocation } from "react-router-dom";

const RoundRecordPage = () => {
  const location = useLocation()
  return (
    <>
      { location.pathname === "/record" && <Navigate to="/record/rounds" />}
      <div className="w-screen h-screen flex flex-col">
        <TopHeader header="Record" />
        <div className="grow overflow-y-auto bg-gray-900">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RoundRecordPage;
