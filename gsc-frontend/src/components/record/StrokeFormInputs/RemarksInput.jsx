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
    <textarea
      className="w-full align-top shadow-sm font-medium bg-gray-700/50 text-white"
      rows="3"
      value={stroke.analysis.remarks}
      placeholder="Enter any additional remarks"
      onChange={handleChange}
    ></textarea>
  );
};

export default RemarksInput;
