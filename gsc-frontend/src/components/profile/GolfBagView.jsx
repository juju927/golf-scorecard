import { useAtomValue } from "jotai";
import { userProfileAtom } from "../../utilities/atom";
import { useState, useEffect } from "react";

const GolfBagView = () => {
  const userProfile = useAtomValue(userProfileAtom);
  const [woods, setWoods] = useState([]);
  const [hybrids, setHybrids] = useState([]);
  const [irons, setIrons] = useState([]);
  const [wedges, setWedges] = useState([]);
  const [putters, setPutters] = useState([]);

  useEffect(() => {
    setWoods(userProfile?.golf_bag?.filter((club) => club.category == "Woods"));
    setHybrids(
      userProfile?.golf_bag?.filter((club) => club.category == "Hybrids")
    );
    setIrons(userProfile?.golf_bag?.filter((club) => club.category == "Irons"));
    setWedges(
      userProfile?.golf_bag?.filter((club) => club.category == "Wedges")
    );
    setPutters(
      userProfile?.golf_bag?.filter((club) => club.category == "Putters")
    );
  }, [userProfile]);

  return (
    <div className="w-full h-fit p-2">
      {woods.length > 0 && (
        <div className="py-2 grid grid-cols-5 grid-auto-rows">
          <p className="row-span-4 text-xs uppercase text-gray-100/50 self-center">
            Woods
          </p>
          {woods.map((club) => (
            <div key={club.serial} className="place-self-center">
              {club.abbrvName}
            </div>
          ))}
        </div>
      )}
      {hybrids.length > 0 && (
        <div className="py-2 grid grid-cols-5 grid-auto-rows">
          <p className="row-span-4 text-xs uppercase text-gray-100/50 self-center">
            Hybrids
          </p>
          {hybrids.map((club) => (
            <div key={club.serial} className="place-self-center">
              {club.abbrvName}
            </div>
          ))}
        </div>
      )}
      {irons.length > 0 && (
        <div className="py-2 grid grid-cols-5 grid-auto-rows">
          <p className="row-span-4 text-xs uppercase text-gray-100/50 self-center">
            Irons
          </p>
          {irons.map((club) => (
            <div key={club.serial} className="place-self-center">
              {club.abbrvName}
            </div>
          ))}
        </div>
      )}
      {wedges.length > 0 && (
        <div className="py-2 grid grid-cols-5 grid-auto-rows">
          <p className="row-span-4 text-xs uppercase text-gray-100/50 self-center">
            Wedges
          </p>
          {wedges.map((club) => (
            <div key={club.serial} className="place-self-center">
              {club.abbrvName}
            </div>
          ))}
        </div>
      )}
      {putters.length > 0 && (
        <div className="py-2 grid grid-cols-5 grid-auto-rows">
          <p className="row-span-4 text-xs uppercase text-gray-100/50 self-center">
            Putters
          </p>
          {putters.map((club) => (
            <div key={club.serial} className="place-self-center">
              {club.abbrvName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GolfBagView;
