import { useEffect } from "react";
import { useState } from "react";
import SectionHeader from "../common/SectionHeader";
import StrokeDetails from "./StrokeDetails";

import { AiFillCaretLeft } from "react-icons/ai";
import { TbGolf } from "react-icons/tb";
import { AiFillCaretRight } from "react-icons/ai";


const ScorecardPH = ({ roundDetails }) => {
  const [selectedHole, setSelectedHole] = useState(roundDetails?.round_record?.[0]?.hole_num)
  const [holeDetails, setHoleDetails] = useState({})

  const nextHole = () => {
    if (selectedHole == roundDetails?.round_record?.[roundDetails?.round_record?.length - 1]?.hole_num) {
      setSelectedHole(roundDetails?.round_record?.[0]?.hole_num)
    } else {
      setSelectedHole(parseInt(selectedHole) + 1)
    }
  }

  const prevHole = () => {
    if (selectedHole == roundDetails?.round_record?.[0]?.hole_num) {
      setSelectedHole(roundDetails?.round_record?.[roundDetails?.round_record?.length - 1]?.hole_num)
    } else {
      setSelectedHole(parseInt(selectedHole) - 1)
    }
  }


  useEffect(()=> {
    setHoleDetails(roundDetails?.round_record?.filter((hole)=> hole.hole_num == selectedHole)[0])
  }, [selectedHole, roundDetails])

  return (
    <>

      <select className="block w-full h-content text-center text-2xl font-bold font-serif text-white focus:outline-0 outline-none border-none focus:border-none bg-transparent bg-none" value={selectedHole} onChange={(e)=> setSelectedHole(e.target.value)}>
        { roundDetails?.round_record?.map((hole) => (
          <option key={hole._id} value={hole.hole_num}>Hole {hole.hole_num}</option>
        )) }
      </select>
      
      <SectionHeader headerName={"stroke details"} />

      <div>
        { holeDetails && holeDetails?.stroke_details?.map((stroke) => (
          <StrokeDetails key={stroke._id} stroke={stroke} />
        ))}
      </div>

      <div className="w-full pt-5 grid grid-cols-5 text-slate-300">
        
        <div className="col-span-2 flex justify-center text-3xl" onClick={prevHole}><AiFillCaretLeft /></div>
        <div className="flex justify-center items-center text-lg"><TbGolf /></div>
        <div className="col-span-2 flex justify-center text-3xl" onClick={nextHole}><AiFillCaretRight /></div>

      </div>

    </>
  );
};

export default ScorecardPH;
