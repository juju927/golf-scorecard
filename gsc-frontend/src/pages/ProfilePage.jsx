import { useAtom } from "jotai";
import BottomNav from "../components/common/BottomNav";
import TopHeader from "../components/common/TopHeader";
import { userProfileAtom } from "../utilities/atom";
import { useState } from "react";
import GolfBagEditor from "../components/profile/GolfBagEditor";
import SectionHeader from "../components/common/SectionHeader";
import golfBag from "../assets/images/golf-bag.png";
import GolfBagView from "../components/profile/GolfBagView";
import Avatar from "../components/profile/Avatar";
import { countryFlags } from "../utilities/icons";
import UserProfileEditor from "../components/profile/UserProfileEditor";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);

  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [showGolfBagEditor, setShowGolfBagEditor] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col">
      <TopHeader header="Profile" />

      <div className="grow overflow-y-auto bg-gray-900">
        {showGolfBagEditor && (
          <GolfBagEditor setShowGolfBagEditor={setShowGolfBagEditor} />
        )}
        <UserProfileEditor
          showProfileEditor={showProfileEditor}
          setShowProfileEditor={setShowProfileEditor}
        />

        <div className="p-4 flex flex-col gap-3">
          <div className="flex gap-5 items-center justify-start">
            <Avatar profile_picture={userProfile?.profile_picture} />
            <div
              className="flex flex-col justify-between text-white"
              onClick={() => setShowProfileEditor(true)}
            >
              <div className="capitalize font-semibold">
                {userProfile.display_name} {countryFlags[userProfile.country]}{" "}
                <span className="lowercase italic font-extralight text-white/50">
                  @{userProfile.username}
                </span>
              </div>

              <div className="">
                Handicap:{" "}
                <span className="font-semibold">
                  {userProfile.handicap || 0}
                </span>
              </div>
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
                    <p className="italic text-sm font-slate-300 text-center pb-4">
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
                {userProfile.golf_bag?.length > 0 && (
                  <div className="h-fit w-fit mt-2 p-2 border border-teal-500">
                    <p
                      className="uppercase text-teal-500 text-sm text-center"
                      onClick={() => setShowGolfBagEditor(true)}
                    >
                      edit golf bag
                    </p>
                  </div>
                )}
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
