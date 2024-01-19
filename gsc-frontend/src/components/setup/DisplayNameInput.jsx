const DisplayNameInput = ({
  display_name,
  handleDisplayNameChange,
}) => {
  return (
    <>
      <h1 className="text-center text-2xl font-bold text-white pb-5">
        What is your name?
      </h1>

      <input
        id="nameInput"
        value={display_name}
        onChange={handleDisplayNameChange}
        className="w-full bg-gray-700/50 border-none text-white"
        placeholder="Name"
      />

      <p className="mt-5 text-left text-xs text-gray-500">
        Your name will be shown on the golf scorecard and golf stats pages.
      </p>

    </>
  );
};

export default DisplayNameInput;
