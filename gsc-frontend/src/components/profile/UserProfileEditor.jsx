import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { countryFlags } from "../../utilities/icons";
import { updateProfileService } from "../../utilities/profiles-service";
import { userProfileAtom } from "../../utilities/atom";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { useState } from "react";

const UserProfileEditor = ({ showProfileEditor, setShowProfileEditor }) => {
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);

  const [profile, setProfile] = useState({
    display_name: userProfile.display_name || "",
    country: userProfile.country || "",
    handicap: userProfile.handicap || 0,
  });

  const closeModal = () => {
    setShowProfileEditor(false);
  };

  const handleDisplayNameChange = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      display_name: e.target.value,
    }));
  };

  const handleCountryChange = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      country: e.target.value,
    }));
  };

  const handleHandicapChange = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      handicap: e.target.value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedProfile = await updateProfileService(profile);
      setUserProfile(updatedProfile);
    } catch (err) {
      toast.error(err.message);
    } finally {
      closeModal();
    }
  };

  return (
    <Transition appear show={showProfileEditor} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transfieldset overflow-hidden border border-white rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  User Details
                </Dialog.Title>

                <div className="mt-4 flex flex-col gap-3">
                  <fieldset>
                    <label
                      htmlFor="nameInput"
                      className="block text-xs text-gray-500 uppercase"
                    >
                      Display name
                    </label>
                    <input
                      id="nameInput"
                      value={profile.display_name}
                      onChange={handleDisplayNameChange}
                      className="w-full bg-gray-700/50 border-none text-white"
                    />
                  </fieldset>

                  <fieldset>
                    <label
                      htmlFor="countrySelect"
                      className="block text-xs text-gray-500 uppercase"
                    >
                      Country
                    </label>
                    <select
                      id="countrySelect"
                      value={profile.country}
                      onChange={handleCountryChange}
                      className="w-full bg-transparent border-none text-white"
                    >
                      <option value={""}></option>
                      {Object.keys(countryFlags).map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </fieldset>

                  <fieldset>
                    <label
                      htmlFor="handicapInput"
                      className="block text-xs text-gray-500 uppercase"
                    >
                      Handicap
                    </label>
                    <input
                      id="handicapInput"
                      type="number"
                      min="0"
                      max="53"
                      value={profile.handicap}
                      onChange={handleHandicapChange}
                      className="w-full bg-gray-700/50 border-none text-white"
                    />
                  </fieldset>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    className="inline-flex justify-center rounded-md border border-teal-800 bg-teal-400 px-4 py-2 text-sm font-medium text-black"
                    onClick={handleUpdateProfile}
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UserProfileEditor;
