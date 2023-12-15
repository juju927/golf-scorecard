import { metronome } from "ldrs";

const Loading = () => {
  metronome.register();
  return (
    <div className="w-full flex justify-center p-6">
      <l-metronome size="40" speed="1.6" color="white"></l-metronome>
    </div>
  );
};

export default Loading;
