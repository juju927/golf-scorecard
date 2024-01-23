import { Outlet } from "react-router-dom";
import { getUser } from "../utilities/users-service";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Base = () => {
  const user = getUser();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const goThere = () => {
      if (!user) {
        navigate("/login");
      } else {
        if (user.profile?.golf_bag?.length > 0) {
          navigate("/home");
        } else {
          navigate("/setup");
        }
      }
    };

    if (location.pathname == "/") {
      goThere();
    }
  }, [location.pathname]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Base;
