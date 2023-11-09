import { useAtomValue } from "jotai";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"
import { currentRoundRecordAtom } from "../utilities/atom";
import StrokeListItem from "../components/Rounds/StrokeListItem";
import NewStrokeForm from "../components/Rounds/NewStrokeForm";

const HolePage = () => {
  const { holeNo } = useParams();
  const navigate = useNavigate()
  const roundDetails = useAtomValue(currentRoundRecordAtom)
  const [holeDetails, setHoleDetails] = useState({})
  const [strokeDetails, setStrokeDetails] = useState([])
  
  const firstHole = roundDetails.round_record?.[0].hole_num
  const lastHole = roundDetails.round_record?.[roundDetails.round_record.length-1].hole_num

  const prevHole = holeNo == firstHole ? holeNo : parseInt(holeNo) - 1
  const nextHole = holeNo == lastHole ? holeNo : parseInt(holeNo) + 1
  

  useEffect(()=> {
    if ((parseInt(holeNo) < parseInt(firstHole)) || (parseInt(holeNo) > parseInt(lastHole))) {
      navigate(`/record/hole/${firstHole}`)
    }
    setHoleDetails(roundDetails?.course?.holes.filter((hole) => hole.hole_no == holeNo)[0])
    setStrokeDetails(roundDetails?.round_record?.filter((hole) => hole.hole_num == holeNo)[0])
  }, [roundDetails, holeNo])


  return (
    <div className="max-w-full grow dark:bg-gray-900 flex flex-col max-h-full">
      <div className="flex flex-col justify-center bg-teal-950 slate-950 border border-b-teal-600 px-2">
        <div className="flex w-100 justify-center justify-between">
        <Link to={`/record/hole/${prevHole}`}>⬅️</Link>
        <h2 className="text-3xl font-bold text-slate-50 text-center py-2">
          Hole {holeDetails?.hole_no} 
        </h2>
        <Link to={`/record/hole/${nextHole}`}>➡️</Link>
        </div>
        <div className="w-100 grid grid-cols-3 gap-4 px-2 pb-3">
          <h2 className="justify-self-start text-xl text-slate-200">Par {holeDetails?.par}</h2>
          <h2 className="justify-self-center text-xl text-slate-200">{holeDetails?.dists?.[roundDetails.tee]} m</h2>
          <h2 className="justify-self-end text-xl text-slate-200">Index {holeDetails?.handicap_index?.[roundDetails.tee] || holeDetails?.handicap_index?.all} </h2>
        </div>
      </div>

      <div className="overflow-y-auto">
        <h1 className="block text-sm font-medium text-white pt-4 px-4">
          Stroke list:
        </h1>
        { strokeDetails?.stroke_details?.length == 0 ? (
          <h1>no shots played yet</h1>
          
        ): (
          strokeDetails?.stroke_details?.map((stroke, idx) => (
            <StrokeListItem key={stroke._id} idx={idx} stroke={stroke} />
          ))
        )}
        <NewStrokeForm roundId={roundDetails?._id} recordId={strokeDetails?._id} />
      </div>

    </div>
  );
};

export default HolePage;
