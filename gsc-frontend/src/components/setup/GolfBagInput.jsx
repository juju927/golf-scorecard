import { useLoaderData } from "react-router-dom";
import SectionHeader from "../common/SectionHeader";
import { FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";

const GolfBagInput = ({ golf_bag, handleGolfBagChange }) => {
  const golfClubsLibrary = useLoaderData();
  const clubCategories = ["Woods", "Hybrids", "Irons", "Wedges", "Putters"];

  const removeClub = (club) => {
    const clubList = [...golf_bag];
    const idxToRemove = clubList.findIndex(
      (userClub) => userClub._id == club._id
    );
    clubList.splice(idxToRemove, 1);
    handleGolfBagChange(clubList);
  };

  const addClub = (club) => {
    const clubList = [...golf_bag];
    if (clubList.length == 14) {
      toast.error("Unable to add club - golf bag can only hold a maximum of 14 clubs.");
      return;
    }
    clubList.push(club);
    clubList.sort((club1, club2) => {
      if (club1.serial < club2.serial) {
        return -1;
      }
      if (club1.serial > club2.serial) {
        return 1;
      }
      return 0;
    });
    handleGolfBagChange(clubList);
  };

  const handleClick = async (club) => {
    if (golf_bag.some((userClub) => userClub._id == club._id)) {
      removeClub(club);
    } else {
      addClub(club);
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold text-white pb-5">
        Set up your golf bag
      </h1>

      <p className="mt-5 text-left text-xs text-gray-500">
        These will be clubs you can select from while recording your strokes.
        This is essential to your app experience.
      </p>

      {clubCategories.map((category) => (
        <div className="w-screen px-2" key={category}>
          <div>
            <SectionHeader headerName={category} />
          </div>

          {golfClubsLibrary
            .filter((club) => club.category == category)
            .map((club) => (
              <div
                key={club._id}
                className={`flex w-full h-8 gap-3 my-2 ${
                  golf_bag.some((userClub) => userClub._id == club._id) &&
                  "bg-teal-500"
                }`}
                onClick={() => handleClick(club)}
              >
                {golf_bag.some((userClub) => userClub._id == club._id) && (
                  <FiCheck />
                )}
                <p className="w-full text-white text-center">
                  {club.name} ({club.abbrvName})
                </p>
              </div>
            ))}
        </div>
      ))}
    </>
  );
};

export default GolfBagInput;
