import { useAtomValue, useSetAtom } from "jotai";
import BottomNav from "../components/common/BottomNav";
import TopHeader from "../components/common/TopHeader";
import { userAtom } from "../utilities/atom";
import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import Flag from "react-world-flags";
import golfClubsLibrary from "../utilities/club-types";
import { updateProfileService } from "../utilities/profiles-service";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const user = useAtomValue(userAtom);
  const setUser = useSetAtom(userAtom);

  // user editable fields on the page
  const [profile, setProfile] = useState({
    display_name: user.profile.display_name || "",
    country: user.profile.country || "",
    handicap: user.profile.handicap || 0,
    profile_picture: user.profile.profile_picture || "",
  });
  const [userClubs, setUserClubs] = useState(user.profile.golf_bag);

  // for dropdown box functionality
  const clubCategories = ["Woods", "Hybrids", "Irons", "Wedges", "Putters"];
  const [selectedCategory, setSelectedCategory] = useState("");

  // conditional toggles for editing page vs viewing
  const [editProfile, setEditProfile] = useState(false);
  const [editGolfBag, setEditGolfBag] = useState(false);

  const handleDisplayNameChange = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      display_name: e.target.value,
    }));
  };

  const handleCountryChange = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      country: e,
    }));
  };

  const handleHandicapChange = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      handicap: e.target.value,
    }));
  };

  const handleEditProfile = () => {
    if (editProfile) {
      setProfile({
        display_name: user.profile.display_name || "",
        country: user.profile.country || "",
        handicap: user.profile.handicap || 0,
        profile_picture: user.profile.profile_picture || "",
      });
    }
    setEditProfile(!editProfile);
  };

  const handleUpdateDetails = async () => {
    try {
      const updatedUser = await updateProfileService(profile);
      setUser(updatedUser);
      setEditProfile(!editProfile);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEditGolfBag = () => {
    if (editGolfBag) {
      setUserClubs(user.profile.golf_bag);
    }
    setEditGolfBag(!editGolfBag);
  };

  const handleUpdateGolfBag = async () => {
    try {
      const updatedUser = await updateProfileService({
        golf_bag: userClubs,
      });
      setUser(updatedUser);
      setEditGolfBag(!editGolfBag);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAddClub = (club) => {
    if (!editGolfBag) {
      return;
    }
    if (userClubs.includes(club)) {
      toast.error("Club already added to bag!");
      return;
    }
    const clubList = [...userClubs];
    clubList.push(club);
    clubList.sort((a, b) => a.serial - b.serial);
    setUserClubs(clubList);
  };

  const handleRemoveClub = (idx) => {
    if (!editGolfBag) {
      return;
    }
    const clubList = [...userClubs];
    clubList.splice(idx, 1);
    setUserClubs(clubList);
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <TopHeader header="Profile" />

      {/* main content */}
      <div className="grow overflow-y-auto bg-gray-900">
        <div className="flex flex-col items-center pt-4">
          <div className="relative">
            <img
              src={user.profile.profile_picture}
              className="h-24 w-24 rounded-full object-cover"
            />
            <div className="h-8 w-8 rounded-full absolute bottom-0 right-0 z-10 button bg-teal-500 flex justify-center items-center shadow shadow-md shadow-teal-500/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 h-4 stroke-white fill-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </svg>
            </div>
          </div>

          <div className="capitalize text-xl font-semibold text-white pt-2">
            {user.profile.display_name}
          </div>
          <div className="italic text-sm font-light text-slate-500">
            @{user.username}
          </div>

          {/* input fields */}
          <div className="relative flex flex-col w-full h-fit px-8 pt-2">
            <div className="absolute top-0 right-10 flex justify-end pt-2 gap-2">
              <div
                className={`uppercase text-teal-500 text-sm ${
                  editProfile && "text-teal-500/50"
                }`}
                onClick={handleEditProfile}
              >
                {editProfile ? "cancel" : "edit"}
              </div>
              {editProfile && (
                <div
                  className="uppercase text-teal-500 text-sm"
                  onClick={handleUpdateDetails}
                >
                  save
                </div>
              )}
            </div>

            <div className="display-name-input pb-2">
              <label
                htmlFor="displayNameInput"
                className="text-xs uppercase text-gray-100/50"
              >
                display name
              </label>
              <input
                type="text"
                id="displayNameInput"
                value={profile.display_name}
                onChange={handleDisplayNameChange}
                disabled={!editProfile}
                className="w-full bg-gray-700/50 focus:outline-0 outline-none border-none text-white disabled:bg-transparent"
              />
            </div>

            <div className="flex gap-3">
              <div className="country-input w-1/2">
                <label
                  htmlFor="countrySelect"
                  className="text-xs uppercase text-gray-100/50"
                >
                  country
                </label>
                <div className="flex gap-2">
                  <CountryDropdown
                    valueType="short"
                    labelType="short"
                    id="countryDropdown"
                    defaultOptionLabel={profile.country || "none"}
                    value={profile.country}
                    disabled={!editProfile}
                    onChange={handleCountryChange}
                    className="w-2/3 bg-gray-700/50 focus:outline-0 outline-none border-none text-white uppercase text-sm disabled:bg-transparent"
                  />
                  <Flag code={profile.country} className="h-10" />
                </div>
              </div>

              <div className="handicap-input w-1/2">
                <label
                  htmlFor="handicapInput"
                  className="text-xs uppercase text-gray-100/50"
                >
                  handicap
                </label>
                <input
                  type="number"
                  id="handicapInput"
                  min={0}
                  max={54}
                  value={profile.handicap}
                  disabled={!editProfile}
                  onChange={handleHandicapChange}
                  className="w-full bg-gray-700/50 focus:outline-0 outline-none border-none text-white disabled:bg-transparent"
                />
              </div>
            </div>

            {/* golf bag selection */}
            <div className="relative golf-bag mt-4 pt-2 border-t border-gray-600/50">
              <div className="absolute top-0 right-0 flex justify-end pt-2 gap-2">
                <div
                  className={`uppercase text-teal-500 text-sm ${
                    editGolfBag && "text-teal-500/50"
                  }`}
                  onClick={handleEditGolfBag}
                >
                  {editGolfBag ? "cancel" : "update golf bag"}
                </div>
                {editGolfBag && (
                  <div
                    className="uppercase text-teal-500 text-sm"
                    onClick={handleUpdateGolfBag}
                  >
                    save
                  </div>
                )}
              </div>
              <label className="text-xs uppercase text-gray-100/50">
                golf bag
              </label>
              <div
                className={`grid ${
                  editGolfBag ? "grid-cols-2" : "grid-cols-1"
                } gap-1`}
              >
                <div className="user-clubs text-white pt-1">
                  {userClubs.length == 0 && (
                    <p className="italic text-sm font-slate-300">
                      no clubs in golf bag
                    </p>
                  )}

                  {userClubs.map((club, idx) => (
                    <div
                      className={`relative ml-2 flex gap-3 my-2`}
                      key={idx}
                      onClick={() => handleRemoveClub(idx)}
                    >
                      {editGolfBag && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-6 h-6 stroke-red-300 stroke-1 fill-none absolute -ml-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                      <p>
                        {club.name}{" "}
                        <span className="text-gray-300">
                          ({club.abbrvName})
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  className={`selection-clubs w-full ${
                    !editGolfBag && "hidden"
                  }`}
                >
                  <select
                    name="golfClubLibrary"
                    id="golfClubLibrary"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-gray-700/50 focus:outline-0 outline-none border-none text-white uppercase text-sm"
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
                        className="flex gap-3 my-2"
                        onClick={() => handleAddClub(club)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-6 h-6 stroke-green-300 stroke-1 fill-none"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-white">{club.name}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
