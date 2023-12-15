import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";

const ChipCheck = ({ editedStroke, setEditedStroke }) => {
  const handleClick = () => {
    setEditedStroke((prevState) => ({
      ...prevState, 
      is_chip: !editedStroke.is_chip
    }))
  }

  return (
    <div className="fit flex gap-2 items-center" onClick={handleClick}>
      { editedStroke.is_chip ? <MdCheckBox className="text-white w-6 h-6" /> : <MdCheckBoxOutlineBlank className="text-gray-400/50 w-6 h-6" /> }
      <span className="text-white">Chip</span>
    </div>
  )
}

export default ChipCheck