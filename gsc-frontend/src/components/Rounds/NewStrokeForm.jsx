import { useState } from "react"

const NewStrokeForm = () => {
  const clubs = ["1W", "3W", "5W", "5i", "6i", "7i", "W53", "PW", "Pt"]
  const [newStroke, setNewStroke] = useState({
    club: "",
    some: "thing"
  })

  const handleClubChange = (e) => {
    setNewStroke((prevState) => ({
      ...prevState,
      club: e.target.value
    }))
  }

  return (
    <>
      <div className="w-screen h-fit rounded-t-lg border-solid border-white shadow-md">
        <h1 className="text-white pl-2 my-3">Add new stroke</h1>

        <div className="px-3 grid grid-cols-4 gap-2">
          <h1>club</h1>
          <fieldset className="col-span-3 grid grid-cols-6 grid-cols-2 text-white">
            { clubs.map((club)=> (
              <div key={club}>
                <input type="radio" name="clubOption" value={club} id={club} className="peer hidden [&:checked_+_label_svg]:block" checked={newStroke.club === club} onChange={handleClubChange} />
                <label htmlFor={club} className="block cursor-pointer border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500">
                  <p className="text-gray-700">{club}</p>
                </label>
              </div>
            ))}
          </fieldset>
        </div>



      </div>
    </>
  )
}

export default NewStrokeForm