import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";

const ChipCheck = ({ stroke, setStroke }) => {
  const handleClick = () => {
    setStroke((prevState) => ({
      ...prevState, 
      is_chip: !stroke.is_chip
    }))
  }

  return (
    <div className="flex gap-2 items-center" onClick={handleClick}>
      { stroke.is_chip ? <MdCheckBox className="text-white w-6 h-6" /> : <MdCheckBoxOutlineBlank className="text-gray-400/50 w-6 h-6" /> }
      <span className="text-white">Chip</span>
    </div>
  )
}

export default ChipCheck