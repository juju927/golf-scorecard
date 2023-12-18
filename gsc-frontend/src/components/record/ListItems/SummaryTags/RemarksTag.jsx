import { BiSolidQuoteAltRight } from "react-icons/bi";

const RemarksTag = ({ remarks }) => {
  return (
    <>
      { remarks && 
      (
        <div className="w-fit h-fit text-xl text-black rounded-full border border-2 border-black bg-slate-400">
          <BiSolidQuoteAltRight />
        </div>
      )}
    </>
  )
}

export default RemarksTag