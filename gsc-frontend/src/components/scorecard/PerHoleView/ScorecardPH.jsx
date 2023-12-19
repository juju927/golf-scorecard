import { useEffect } from "react";
import { useState } from "react";
import SectionHeader from "../../common/SectionHeader";
import StrokeDetails from "./StrokeDetails";

import { AiFillCaretLeft } from "react-icons/ai";
import { TbGolf } from "react-icons/tb";
import { AiFillCaretRight } from "react-icons/ai";
import PHVHoleDetails from "./PHVHoleDetails";
import StrokesSummary from "../../record/StrokesSummary";


const ScorecardPH = ({ roundDetails }) => {
  const [selectedHole, setSelectedHole] = useState(roundDetails?.round_record?.[0]?.hole_num)
  const [strokeDetails, setStrokeDetails] = useState({})
  const [courseHoleDetails, setCourseHoleDetails] = useState({})

  const goNextHole = () => {
    // if selected hole is last hole - go to 1st hole
    if (selectedHole == roundDetails?.round_record?.[roundDetails?.round_record?.length - 1]?.hole_num) {
      setSelectedHole(roundDetails?.round_record?.[0]?.hole_num)
    } else {
      // else go to next hole
      setSelectedHole(parseInt(selectedHole) + 1)
    }
  }

  const goPrevHole = () => {
    // if selected hole is first hole - go to last hole
    if (selectedHole == roundDetails?.round_record?.[0]?.hole_num) {
      setSelectedHole(roundDetails?.round_record?.[roundDetails?.round_record?.length - 1]?.hole_num)
    } else {
      // else go to prev hole
      setSelectedHole(parseInt(selectedHole) - 1)
    }
  }

  const getStrokeDetails = () => {
    return roundDetails?.round_record?.filter((hole)=> hole.hole_num == selectedHole)[0]
  }

  const getHoleDetails = () => {
    var filteredHoleDetails = roundDetails?.course?.holes?.filter((hole)=> hole.hole_no == selectedHole)[0]
    filteredHoleDetails = {
      ...filteredHoleDetails,
      tee: roundDetails?.tee,
      dist: filteredHoleDetails.dists[roundDetails?.tee],
      dist_unit: roundDetails?.course?.dist_unit,
      index_no: filteredHoleDetails.handicap_index[roundDetails?.tee] || filteredHoleDetails.handicap_index?.all
    }
    return filteredHoleDetails 
  }

  useEffect(()=> {
    setStrokeDetails(getStrokeDetails())
    setCourseHoleDetails(getHoleDetails())
  }, [selectedHole, roundDetails])

  return (
    <>
      <PHVHoleDetails courseHoleDetails={courseHoleDetails} goNextHole={goNextHole} goPrevHole={goPrevHole} />
      <StrokesSummary holeRecord={strokeDetails} par_no={courseHoleDetails?.par} />

      <SectionHeader headerName={"stroke details"} />

      <div>
        { strokeDetails && strokeDetails?.stroke_details?.map((stroke, idx) => (
          <StrokeDetails key={stroke._id} stroke={stroke} idx={idx} />
        ))}
      </div>

      <div className="w-full pt-5 grid grid-cols-5 text-slate-300">
        
        <div className="col-span-2 flex justify-center text-3xl" onClick={goPrevHole}><AiFillCaretLeft /></div>
        <div className="flex justify-center items-center text-lg"><TbGolf /></div>
        <div className="col-span-2 flex justify-center text-3xl" onClick={goNextHole}><AiFillCaretRight /></div>

      </div>

    </>
  );
};

export default ScorecardPH;
