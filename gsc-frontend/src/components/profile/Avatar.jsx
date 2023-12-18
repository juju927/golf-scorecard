import { AiOutlineCamera } from "react-icons/ai";

const Avatar = ({ profile_picture }) => {
  return (
    <div className="relative">
      <img
        src={profile_picture}
        className="h-16 w-16 rounded-full object-cover"
      />
      <div className="h-6 w-6 rounded-full absolute bottom-0 right-0 z-10 button bg-teal-500 flex justify-center items-center">
        <AiOutlineCamera className="text-white" />
      </div>
    </div>
  );
};

export default Avatar;
