import { Outlet } from "react-router-dom"
import { getUser } from "../utilities/users-service"
import { Navigate } from "react-router-dom"

const Base = () => {
  const user = getUser()
  
  return (
    <>
    { user ? user.profile?.golf_bag?.length == 0 ? <Navigate to="/setup" /> : <Navigate to="/home" /> : <Navigate to="/login" />}
    <Outlet />
    </>
  )
}

export default Base