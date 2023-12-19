import { useAtomValue } from "jotai";
import { userProfileAtom } from "../../../utilities/atom";

const GolfClubSelect = ({ stroke, setStroke }) => {
  const userProfile = useAtomValue(userProfileAtom);
  const clubs = userProfile?.golf_bag;

  const clubCategories = ["Woods", "Hybrids", "Irons", "Wedges", "Putters"];

  const handleChange = (e) => {
    const selectedClub = clubs.filter(
      (club) => club._id == e.target.value
    )[0];
    setStroke((prevState) => ({
      ...prevState,
      club: selectedClub,
    }));
  };

  return (
    <div className="w-full">
      <select
        name="golfClubUsed"
        id="golfClubUsed"
        value={stroke.club?._id}
        onChange={handleChange}
        className="w-full bg-gray-700/50 focus:outline-0 outline-none border-none text-white text-center"
      >
        <option value={""}>Select a club</option>
        {clubCategories.map((category) => (
          <optgroup label={category} key={category}>
            {clubs
              .filter((club) => club.category == category)
              .map((club) => (
                <option value={club._id} key={club._id}>
                  {club.name}
                </option>
              ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};

export default GolfClubSelect;
