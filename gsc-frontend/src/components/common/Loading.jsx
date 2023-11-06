import { metronome } from "ldrs";

const Loading = () => {
  metronome.register();
  return <l-metronome size="40" speed="1.6" color="black"></l-metronome>;
};

export default Loading;