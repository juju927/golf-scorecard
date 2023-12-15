import { Outlet } from "react-router-dom";
import { getUser } from "../utilities/users-service";
import { Navigate } from "react-router-dom";

const Base = () => {
  return (
    <div className="absolute inset-0">
      {getUser() ? <Navigate to="/home" /> : <Navigate to="/login" />}
      <Outlet />
    </div>
  );
};

export default Base;
