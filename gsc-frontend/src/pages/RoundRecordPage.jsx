// import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import { getRoundService } from "../utilities/rounds-service";
// import toast from "react-hot-toast";

const RoundRecordPage = () => {
  // const [roundDetails, setRoundDetails] = useState({})


  // useEffect(() => {
  //   const fetchRoundDetails = async () => {
  //     try {
  //       const fetchedDetails = await getRoundService(roundId)
  //       setRoundDetails(fetchedDetails)
  //     } catch (err) {
  //       toast.error(`${err.message}`);
  //     }
  //   }
  //   fetchRoundDetails()
    
  // }, [roundId])

  return (
    <>
      <div>some nav bar</div>
      <Outlet />
    </>
  );
};

export default RoundRecordPage;
