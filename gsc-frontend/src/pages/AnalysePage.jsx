import { Outlet } from "react-router-dom"
import TopHeader from "../components/common/TopHeader"
import BottomNav from "../components/common/BottomNav"
// import { Navigate } from "react-router-dom"


const AnalysePage = () => {
  return (
    <>
      {/* <Navigate to="/analyse/s" /> */}
      <div className="w-screen h-screen flex flex-col">
        <TopHeader header="Analyse" />
        <div className="grow">
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </>
  )
}

export default AnalysePage