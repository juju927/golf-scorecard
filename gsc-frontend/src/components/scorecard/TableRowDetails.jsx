import { useEffect } from "react"
import { useState } from "react"

const TableRowDetails = ({ record, roundDetails }) => {
  const [holeDetails, setHoleDetails] = useState({})

  useEffect(()=> {
    setHoleDetails(roundDetails?.course.holes?.filter((hole) => hole.hole_no == record?.hole_num))
  }, [roundDetails, record])

  return (
    <tr className="text-center">
      <td className="border border-white">{record?.hole_num}</td>
      <td className="border border-white">{holeDetails[0]?.dists?.[roundDetails?.tee]}</td>
      <td className="border border-white">{holeDetails[0]?.par}</td>
      <td className="border border-white">{holeDetails[0]?.handicap_index?.[roundDetails?.tee] || holeDetails[0]?.handicap_index?.all}</td>
      <td className="w-full flex justify-center border border-white"><p className={`w-fit px-2 border ${record?.total_strokes > holeDetails[0]?.par && "border-rose-400"} ${record?.total_strokes < holeDetails[0]?.par && "rounded-full border-green-400"} ${record?.total_strokes == holeDetails[0]?.par && "border-transparent"}`}>{record?.total_strokes}</p></td>
    </tr>
  )
}

export default TableRowDetails