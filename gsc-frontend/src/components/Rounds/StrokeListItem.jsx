const StrokeListItem = ({ stroke }) => {
  return (
    <div className="w-full pl-4 px-2 py-2 flex">
      <div className="flex flex-col gap">
        <p className="font-bold text-white">{stroke.ground}</p>
        <p className="pl-2 italic text-xs text-gray-300">{stroke.club}</p>
      </div>
      <div className="grow flex gap-2 justify-end items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className="w-6 h-6 fill-gray-300"
        >
          <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
        </svg>
      </div>
    </div>
  );
};

export default StrokeListItem;
