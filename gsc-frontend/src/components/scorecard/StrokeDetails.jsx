import { WiDirectionUpLeft } from "react-icons/wi";
import { WiDirectionUpRight } from "react-icons/wi";
import { FaArrowUp } from "react-icons/fa6";

import { RiArrowTurnBackFill } from "react-icons/ri";
import { GiArrowDunk } from "react-icons/gi";
import { PiArrowArcRightBold } from "react-icons/pi";

const StrokeDetails = ({ stroke }) => {
  return (
    <div className="w-full py-3 grid grid-cols-3 border-b border-slate-300/50">
      <div className="flex flex-col items-center">
        <div
          className={`uppercase text-lg ${
            stroke.ground == "Tee-off" && "text-green-400"
          } ${stroke.ground == "Fairway" && "text-green-500"} ${
            stroke.ground == "Green" && "text-green-300"
          } ${stroke.ground == "Rough" && "text-green-600"} ${
            stroke.ground == "Sand" && "text-stone-400"
          }`}
        >
          {stroke.ground}
        </div>
        <div className="pl-2 italic text-sm text-slate-300">
          {stroke?.club?.name}
        </div>
      </div>
      <div className="col-span-2">
        <div className="analysis flex gap-2">
          {stroke?.analysis?.direction == "straight" ? (
            <div className="flex py-1 text-sm bg-green-200 text-green-800 items-center rounded-full">
              <FaArrowUp className="w-6 h-3" />
              <span className="pr-2">{stroke?.analysis?.direction}</span>
            </div>
          ) : (
            <div className="flex text-sm bg-rose-200 text-rose-800 items-center rounded-full">
              {stroke?.analysis?.direction == "left" && (
                <WiDirectionUpLeft className="w-6 h-6" />
              )}
              {stroke?.analysis?.direction == "right" && (
                <WiDirectionUpRight className="w-6 h-6" />
              )}
              <span className="pr-2">{stroke?.analysis?.direction}</span>
            </div>
          )}

          {stroke?.analysis?.distance == "average" ? (
            <div className="flex py-1 text-sm bg-green-200 text-green-800 items-center rounded-full">
              <GiArrowDunk className="w-6 h-3" />
              <span className="pr-2">{stroke?.analysis?.distance}</span>
            </div>
          ) : (
            <div className="flex text-sm bg-rose-200 text-rose-800 items-center rounded-full">
              {stroke?.analysis?.distance == "short" && (
                <RiArrowTurnBackFill className="mx-1 w-4 h-4" />
              )}
              {stroke?.analysis?.distance == "long" && (
                <PiArrowArcRightBold className="mx-1 w-4 h-4" />
              )}
              <span className="pr-2">{stroke?.analysis?.distance}</span>
            </div>
          )}
        </div>

        {stroke.analysis?.remarks?.length > 0 && (
          <p className="italic text-slate-300">
            &quot;{stroke.analysis?.remarks}&quot;
          </p>
        )}
      </div>
    </div>
  );
};

export default StrokeDetails;
