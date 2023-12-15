import { Outlet } from "react-router-dom"
import { getUser } from "../utilities/users-service"
import { Navigate } from "react-router-dom"

const Base = () => {
  return (
    <>
    { getUser() ? <Navigate to="/home" /> : <Navigate to="/login" />}
    <Outlet />
    </>
  )
}

export default Base