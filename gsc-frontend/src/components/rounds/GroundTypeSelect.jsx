const GroundTypeSelect = ({ editedStroke, setEditedStroke }) => {
  const groundTypes = ["Tee-off", "Fairway", "Rough", "Sand", "Green"];

  const handleChange = (e) => {
    setEditedStroke((prevState) => ({
      ...prevState,
      ground: e.target.value
    }))
  };

  return (
    <div className="w-full">
      <select
        name="groundType"
        id="groundType"
        value={editedStroke.ground}
        onChange={handleChange}
        className="bg-gray-700/50 focus:outline-0 outline-none border-none text-white text-center"
      >
        <option value="">Select a type</option>
        {groundTypes.map((ground) => (
          <option value={ground} key={ground}>
            {ground}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GroundTypeSelect;
