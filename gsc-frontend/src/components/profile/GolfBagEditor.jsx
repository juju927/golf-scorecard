import { useAtomValue, useSetAtom } from "jotai";
import { userProfileAtom } from "../../utilities/atom";
// import golfClubsLibrary from "../../utilities/club-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { simpleConfirm } from "react-simple-dialogs";
import { updateProfileService } from "../../utilities/profiles-service";
import { FiCheck } from "react-icons/fi";
import { useLoaderData } from "react-router-dom";
import SectionHeader from "../common/SectionHeader";

const GolfBagEditor = ({ setShowGolfBagEditor }) => {
  const golfClubsLibrary = useLoaderData();
  const userProfile = useAtomValue(userProfileAtom);
  const setUserProfile = useSetAtom(userProfileAtom);
  const [userClubs, setUserClubs] = useState(userProfile.golf_bag);

  // for dropdown box functionality
  const clubCategories = ["Woods", "Hybrids", "Irons", "Wedges", "Putters"];

  const removeClub = (club) => {
    const clubList = [...userClubs];
    const idxToRemove = clubList.findIndex(
      (userClub) => userClub._id == club._id
    );
    clubList.splice(idxToRemove, 1);
    setUserClubs(clubList);
  };

  const addClub = (club) => {
    const clubList = [...userClubs];
    clubList.push(club);
    clubList.sort((club1, club2) => {
      const club1n = club1.name.toLowerCase();
      const club2n = club2.name.toLowerCase();
      if (club1n < club2n) {
        return -1;
      }
      if (club1n > club2n) {
        return 1;
      }
      return 0;
    });
    setUserClubs(clubList);
  };

  const handleClick = async (club) => {
    if (userClubs.some((userClub) => userClub._id == club._id)) {
      removeClub(club);
    } else {
      addClub(club);
    }
  };

  const handleClose = async () => {
    if (
      await simpleConfirm({
        title: null,
        message: "Save changes?",
        confirmLabel: "Save",
        cancelLabel: "No",
      })
    ) {
      await saveChanges();
    } else {
      setShowGolfBagEditor(false);
    }
  };

  const saveChanges = async () => {
    await handleUpdateGolfBag();
    toast.success("Golf bag saved.");
    setShowGolfBagEditor(false);
  };

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
      <div className="flex flex-col relative w-full h-5/6 shadow-md rounded-lg border border-black bg-gray-900 overflow-y-scroll">
        {/* header */}
        <div className="h-fit flex justify-center border-b border-white bg-black">
          <h1 className="text-center text-white my-3 text-lg tracking-wide font-semibold">
            Select Golf Clubs
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
        <div className="mx-auto w-full grow overflow-y-auto">
          {clubCategories.map((category) => (
            <>
              <div key={category}>
                <SectionHeader headerName={category} />
              </div>

              {golfClubsLibrary
                .filter((club) => club.category == category)
                .map((club) => (
                  <div
                    key={club._id}
                    className={`flex w-full h-8 gap-3 my-2 ${
                      userClubs.some((userClub) => userClub._id == club._id) &&
                      "bg-teal-500"
                    }`}
                    onClick={() => handleClick(club)}
                  >
                    {userClubs.some((userClub) => userClub._id == club._id) && (
                      <FiCheck />
                    )}
                    <p className="w-full text-white text-center">
                      {club.name} ({club.abbrvName})
                    </p>
                  </div>
                ))}
            </>
          ))}
        </div>

        <div className="w-full h-fit border-t border-black flex justify-center py-2">
          <button
            className="w-1/2 h-fit px-3 py-2 rounded-lg bg-teal-700 text-white font-semibold border border-teal-500 uppercase"
            onClick={saveChanges}
          >
            <div className="flex items-center justify-center">
              <span>save changes</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GolfBagEditor;
