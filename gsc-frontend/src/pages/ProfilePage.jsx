import { useAtomValue, useSetAtom } from "jotai";
import BottomNav from "../components/common/BottomNav";
import TopHeader from "../components/common/TopHeader";
import { userProfileAtom } from "../utilities/atom";
import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import Flag from "react-world-flags";
import { updateProfileService } from "../utilities/profiles-service";
import toast from "react-hot-toast";
import GolfBagEditor from "../components/profile/GolfBagEditor";
import SectionHeader from "../components/common/SectionHeader";
import golfBag from "../assets/images/golf-bag.png";
import GolfBagView from "../components/profile/GolfBagView";

const ProfilePage = () => {
  const userProfile = useAtomValue(userProfileAtom);
  const setUserProfile = useSetAtom(userProfileAtom);

  // user editable fields on the page
  const [profile, setProfile] = useState({
    display_name: userProfile.display_name || "",
    country: userProfile.country || "",
    handicap: userProfile.handicap || 0,
    profile_picture: userProfile.profile_picture || "",
  });

  // conditional toggles for editing profile
  const [editProfile, setEditProfile] = useState(false);

  // toggles for editing golf bag
  const [showGolfBagEditor, setShowGolfBagEditor] = useState(false);

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
        display_name: userProfile.display_name || "",
        country: userProfile.country || "",
        handicap: userProfile.handicap || 0,
        profile_picture: userProfile.profile_picture || "",
      });
    }
    setEditProfile(!editProfile);
  };

  const handleUpdateDetails = async () => {
    try {
      const updatedProfile = await updateProfileService(profile);
      setUserProfile(updatedProfile);
      setEditProfile(!editProfile);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <TopHeader header="Profile" />

      {/* main content */}
      <div className="grow overflow-y-auto bg-gray-900">
        {showGolfBagEditor && (
          <GolfBagEditor setShowGolfBagEditor={setShowGolfBagEditor} />
        )}

        <div className="flex flex-col items-center pt-4">
          <div className="relative">
            <img
              src={userProfile.profile_picture}
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
            {userProfile.display_name}
          </div>
          <div className="italic text-sm font-light text-slate-500">
            @{userProfile.username}
          </div>

          {/* input fields */}
          <div className="flex flex-col w-full h-fit px-8 pt-2">
            <SectionHeader headerName={"user details"} />
            <div className="relative display-name-input pb-2">
              {/* edit button */}
              <div className="absolute top-0 right-0 flex justify-end gap-2">
                <div
                  className={`uppercase text-teal-500 text-sm ${
                    editProfile && "text-teal-500/50"
                  }`}
                  onClick={handleEditProfile}
                >
                  {editProfile ? "cancel" : "edit profile"}
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

              {/* user details */}
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
            <div className="golf-bag">
              <SectionHeader headerName={"golf bag"} />

              <div>
                <div className="user-clubs text-white flex flex-col items-center">
                  {userProfile.golf_bag?.length == 0 && (
                    <>
                      <img src={golfBag} className="w-1/2 h-1/2 max-w-100" />
                      <p className="italic text-sm font-slate-300 text-center">
                        Looks like your golf bag is currently empty.
                      </p>
                      <div className="h-fit w-fit p-2 border border-teal-500">
                        <p
                          className="uppercase text-teal-500 text-sm text-center"
                          onClick={() => setShowGolfBagEditor(true)}
                        >
                          add golf clubs
                        </p>
                      </div>
                    </>
                  )}

                  <GolfBagView />
                  <div className="h-fit w-fit mt-2 p-2 border border-teal-500">
                    <p
                      className="uppercase text-teal-500 text-sm text-center"
                      onClick={() => setShowGolfBagEditor(true)}
                    >
                      edit golf bag
                    </p>
                  </div>

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
