import { metronome } from "ldrs";

const Loading = () => {
  metronome.register();
  return (
    <div className="w-fit flex justify-center">
      <l-metronome size="40" speed="1.6" color="white"></l-metronome>
    </div>
  );
};

export default Loading;
