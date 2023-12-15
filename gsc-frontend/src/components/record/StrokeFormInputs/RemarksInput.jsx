const RemarksInput = ({ stroke, setStroke }) => {
  const handleChange = (e) => {
    setStroke((prevState) => ({
      ...prevState,
      analysis: {
        ...prevState.analysis,
        remarks: e.target.value,
      },
    }));
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 text-white pb-2 items-center">
        <h2 className="text-sm font-light capitalize text-center">remarks</h2>

        <textarea
          className="col-span-3 mt-2 align-top shadow-sm text-sm font-medium bg-gray-700/50"
          rows="3"
          value={stroke.analysis.remarks}
          placeholder="Enter any additional remarks"
          onChange={handleChange}
        ></textarea>
      </div>
    </div>
  );
};

export default RemarksInput;
