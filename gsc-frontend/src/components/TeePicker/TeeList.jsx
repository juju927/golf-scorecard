const TeeList = ({ selectedCourse, selectedTee, setSelectedTee }) => {
  console.log(selectedCourse);

  const handleChange = (e) => {
    setSelectedTee(e.target.value)
  }

  return (
    <>
      <h1 className="block text-sm font-medium text-white pt-4 px-4">Select tee:</h1>
      <fieldset className="grid grid-cols-2 gap-4 px-2 pt-4">
        <legend className="sr-only">Tee List</legend>

        {Object.keys(selectedCourse).length > 0 &&
          Object.keys(selectedCourse?.holes[0].dists).map((tee, idx) => (
            <div key={`${idx}-${tee}`}>
              <input
                type="radio"
                name="TeeOption"
                value={tee}
                id={tee}
                className="peer hidden [&:checked_+_label_svg]:block"
                checked={selectedTee === tee}
                onChange={handleChange}
              />

              <label
                htmlFor={tee}
                className={`block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-gray-700">{tee}</p>

                  <svg
                    className="hidden h-5 w-5 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </label>
            </div>
          ))}
      </fieldset>
    </>
  );
};

export default TeeList;
