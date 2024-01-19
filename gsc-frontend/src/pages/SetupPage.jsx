import { useAtom } from "jotai";
import { useState } from "react";
import { userProfileAtom } from "../utilities/atom";
import DisplayNameInput from "../components/setup/DisplayNameInput";
import CountryInput from "../components/setup/CountryInput";
import { FaAngleLeft } from "react-icons/fa6";
import HandicapInput from "../components/setup/HandicapInput";
import GolfBagInput from "../components/setup/GolfBagInput";
import Loading from "../components/common/Loading";
import { updateProfileService } from "../utilities/profiles-service";
import { useNavigate } from "react-router-dom";

const SetupPage = () => {
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);

  const [profileInputs, setProfileInputs] = useState({
    display_name: userProfile.display_name || "",
    country: userProfile.country || "",
    handicap: userProfile.handicap || 0,
    golf_bag: userProfile.golf_bag || [],
  });

  const [stepNo, setStepNo] = useState(1);
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePrevStepClick = () => {
    if (stepNo > 1) {
      setStepNo(stepNo - 1);
    }
  };

  const handleNextStepClick = () => {
    if (stepNo == 3 && !isValid) {
      return;
    }
    if (stepNo < 4) {
      setStepNo(stepNo + 1);
    }
    if (stepNo == 4) {
      handleSave();
    }
  };

  const handleDisplayNameChange = (e) => {
    setProfileInputs((prevState) => ({
      ...prevState,
      display_name: e.target.value,
    }));
  };

  const handleCountryChange = (e) => {
    setProfileInputs((prevState) => ({
      ...prevState,
      country: e.target.value,
    }));
  };

  const handleHandicapChange = (e) => {
    setProfileInputs((prevState) => ({
      ...prevState,
      handicap: e.target.value,
    }));
    if (Number(e.target.value) >= 0 && Number(e.target.value) <= 53) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleGolfBagChange = (updatedGolfBag) => {
    setProfileInputs((prevState) => ({
      ...prevState,
      golf_bag: updatedGolfBag,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    const updatedProfile = await updateProfileService(profileInputs);
    setUserProfile(updatedProfile);
    setIsLoading(false);
    navigate("/home");
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="h-fit py-5 px-5 bg-gray-900 text-white font-bold">
        <FaAngleLeft
          onClick={handlePrevStepClick}
          className={`${stepNo < 2 && "invisible"}`}
        />
      </div>

      <div className="max-w-full grow overflow-y-auto bg-gray-900">
        <div className="flex flex-col text-center pt-4 px-3 items-center">
          {stepNo == 1 && (
            <DisplayNameInput
              display_name={profileInputs.display_name}
              handleDisplayNameChange={handleDisplayNameChange}
            />
          )}
          {stepNo == 2 && (
            <CountryInput
              country={profileInputs.country}
              handleCountryChange={handleCountryChange}
            />
          )}
          {stepNo == 3 && (
            <HandicapInput
              handicap={profileInputs.handicap}
              handleHandicapChange={handleHandicapChange}
              isValid={isValid}
            />
          )}
          {stepNo == 4 && (
            <GolfBagInput
              golf_bag={profileInputs.golf_bag}
              handleGolfBagChange={handleGolfBagChange}
            />
          )}

          <div
            className="mt-8 w-full h-fit px-3 py-2 rounded-lg bg-teal-700 font-semibold border border-teal-500"
            onClick={handleNextStepClick}
          >
            <div className="uppercase font-medium text-white text-center tracking-tight">
              {isLoading ? <Loading /> : "next"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupPage;
