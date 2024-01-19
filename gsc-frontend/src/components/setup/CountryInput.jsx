import { countryFlags } from "../../utilities/icons";

const CountryInput = ({ country, handleCountryChange }) => {
  return (
    <>
      <h1 className="text-center text-2xl font-bold text-white pb-5">
        Where are you from?
      </h1>

      <select
        id="countrySelect"
        value={country}
        onChange={handleCountryChange}
        className="w-full bg-gray-700/50 border-none text-white"
      >
        <option value="">Select a country</option>
        {Object.keys(countryFlags).map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <p className="mt-5 text-left text-xs text-gray-500">
        Your country will be shown next to your name on the golf scorecard and golf stats pages.
      </p>

    </>
  );
};

export default CountryInput;
