import { Outlet } from "react-router-dom"
import TopHeader from "../components/common/TopHeader"
import BottomNav from "../components/common/BottomNav"
import { useState } from "react"


const AnalysePage = () => {
  const [selectedRound, setSelectedRound] = useState({})

  return (
    <>
      {/* <Navigate to="/analyse/s" /> */}
      <div className="w-screen h-screen flex flex-col">
        <TopHeader header="Analyse" />
        <div className="grow bg-gray-900">
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </>
  )
}

export default AnalysePage