import { useAtomValue, useSetAtom } from "jotai";
import { userProfileAtom } from "../../utilities/atom";
import golfClubsLibrary from "../../utilities/club-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { simpleConfirm } from 'react-simple-dialogs'
import { updateProfileService } from "../../utilities/profiles-service";
import { FiCheck } from "react-icons/fi";

const GolfBagEditor = ({ setShowGolfBagEditor }) => {
  const userProfile = useAtomValue(userProfileAtom);
  const setUserProfile = useSetAtom(userProfileAtom);
  const [userClubs, setUserClubs] = useState(userProfile.golf_bag);

  // for dropdown box functionality
  const clubCategories = ["Woods", "Hybrids", "Irons", "Wedges", "Putters"];
  const [selectedCategory, setSelectedCategory] = useState("Woods");

  const removeClub = (serial) => {
    const clubList = [...userClubs];
    const idxToRemove = clubList.findIndex((club) => club.serial == serial)
    clubList.splice(idxToRemove, 1);
    setUserClubs(clubList);
  };

  const addClub = (club) => {
    const clubList = [...userClubs];
    clubList.push(club);
    clubList.sort((a, b) => a.serial - b.serial);
    setUserClubs(clubList);
  }

  const handleClick = async (club) => {
    if (userClubs.some((userClub)=> userClub.serial == club.serial)) {
      removeClub(club.serial)
    } else {
      addClub(club)
    }
  };

  const handleClose = async () => {
    if (await simpleConfirm({
      title: null,
      message: "Save changes?",
      confirmLabel: 'Save',
      cancelLabel: 'No'
    })) {
      saveChanges();
    } else {
      setShowGolfBagEditor(false);
    }
  }

  const saveChanges = async () => {
    await handleUpdateGolfBag()
    toast.success("Golf bag saved.")
    setShowGolfBagEditor(false)
  }

  const handleUpdateGolfBag = async () => {
    try {
      const updatedProfile = await updateProfileService({
        golf_bag: userClubs,
      });
      setUserProfile(updatedProfile);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-screen h-screen overflow-y-auto z-20 bg-gray-900/90 flex items-end justify-center">
      <div
        className="relative w-full h-5/6 shadow-md rounded-lg border border-black bg-gray-900 overflow-y-scroll"
      >
        {/* header */}
        <div className="flex justify-center">
          <h1 className="text-center text-white pl-2 my-3 text-lg">
            Edit Golf Bag
          </h1>
        </div>

        <div
          className="absolute right-3 top-3 flex justify-center items-center"
          onClick={() => handleClose()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 stroke-2 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* golf bag selection */}
        <div className="mx-auto w-5/6">
          <select
            name="golfClubLibrary"
            id="golfClubLibrary"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-gray-700/50 focus:outline-0 outline-none border-none text-white uppercase text-sm text-center"
          >
            <option value="">category</option>
            {clubCategories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>

          {golfClubsLibrary
            .filter((club) => club.category == selectedCategory)
            .map((club) => (
              <div
                key={club.serial}
                className={`flex w-full h-8 gap-3 my-2 ${userClubs.some((userClub)=> userClub.serial == club.serial) && "bg-teal-500"}`}
                onClick={() => handleClick(club)}
              >
                {userClubs.some((userClub)=> userClub.serial == club.serial) && <FiCheck /> }
                <p className="w-full text-white text-center">{club.name} ({club.abbrvName})</p>
              </div>
            ))}
        </div>
        {/* <div className="flex w-full mt-3 justify-center">
            <div
              className="block rounded-lg w-fit bg-teal-500 shadow-md shadow-teal-500/50 px-5 py-3 text-sm font-medium text-white"
              type="button"
              onClick={saveChanges}
            >
              Save
            </div>
          </div> */}
      </div>
    </div>
  );
};

export default GolfBagEditor;
