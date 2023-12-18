import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { penaltyTypes } from "../../../utilities/icons";

const PenaltyForm = ({
  isOpen,
  setIsOpen,
  stroke,
  setStroke,
}) => {
  const penaltyAmts = [1, 2, 3];
  const handleTypeClick = (penalty) => {
    setStroke((prevState) => ({
      ...prevState,
      penalty: {
        penalty_amt: prevState.penalty?.penalty_amt || 1,
        penalty_type: penalty,
      },
    }));
  };

  const handleAmtClick = (amount) => {
    setStroke((prevState) => ({
      ...prevState,
      penalty: {
        ...prevState.penalty,
        penalty_amt: amount,
      },
    }));
  };

  const handleDeletePenalty = () => {
    setStroke((prevState) => ({
      ...prevState,
      penalty: {},
    }));
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-900 border border-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white flex items-center gap-2"
                >
                  Edit Penalty
                </Dialog.Title>
                <div className="mt-2 flex flex-col gap-2">
                  <p className="text-xs text-gray-400 font-light tracking-tight">
                    Penalty strokes are added <strong>after</strong> the stroke
                    they are tied to.
                  </p>
                  <div>
                    <p className="text-sm text-gray-500">Penalty Type</p>
                    <div className="grid grid-cols-5 gap-2">
                      {Object.keys(penaltyTypes).map((penaltyType) => (
                        <div
                          key={penaltyType}
                          className={`flex flex-col items-center justify-center rounded-lg ${
                            stroke.penalty?.penalty_type == penaltyType
                              ? "bg-teal-400 text-white font-semibold"
                              : "bg-slate-500 text-white/70"
                          }`}
                          onClick={() => handleTypeClick(penaltyType)}
                        >
                          <p>{penaltyType}</p>
                          <p>{penaltyTypes[penaltyType]}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Penalty Amount </p>
                    <div className="grid grid-cols-3 gap-2 justify-items-center">
                      {penaltyAmts.map((penaltyAmt) => (
                        <div
                          key={`${penaltyAmt}-stroke-penalty`}
                          className={`h-fit w-fit rounded-lg ${
                            stroke.penalty?.penalty_amt == penaltyAmt
                              ? "bg-teal-400 text-white font-semibold"
                              : "bg-slate-500 text-white/70"
                          }`}
                          onClick={() => handleAmtClick(penaltyAmt)}
                        >
                          <p className="px-4 py-2">{penaltyAmt}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-red-500 bg-transparent px-4 py-2 text-sm font-medium text-red-500"
                    onClick={handleDeletePenalty}
                  >
                    Delete Penalty
                  </button>

                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-teal-500 bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Save changes
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

export default PenaltyForm;
