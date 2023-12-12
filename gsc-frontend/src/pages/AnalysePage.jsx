import { Outlet } from "react-router-dom"
import TopHeader from "../components/common/TopHeader"
import BottomNav from "../components/common/BottomNav"
import { useState } from "react"
import RoundListItem from "../components/rounds/RoundListItem"
import { useEffect } from "react"
import { getUserRoundsService } from "../utilities/rounds-service"
import toast from "react-hot-toast"
// import { Link } from "react-router-dom"


const AnalysePage = () => {
  const [selectedRound, setSelectedRound] = useState({})
  const [rounds, setRounds] = useState([])

  useEffect(()=> {
    const getUserRounds = async () => {
      try {
        const rounds = await getUserRoundsService();
        setRounds(rounds)
      } catch (err) {
        toast.error(`${err.message}`)
      }
    }
    getUserRounds();
  }, [])

  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <TopHeader header="Analyse" />
        <div className="grow bg-gray-900">
          { Object.keys(selectedRound).length > 0 ? <Outlet /> :
          <div className="w-full px-4 pt-4">
            { rounds?.map((round) => (
              <div key={round._id}>
                  <RoundListItem key={round._id} action={setSelectedRound} link={`s/${round._id}`} round={round} />
              </div>
            ))}
          </div> } 
        </div>
        <BottomNav />
      </div>
    </>
  )
}

export default AnalysePage