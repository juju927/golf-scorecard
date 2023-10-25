import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../assets/images/golf-buddy-logo-nowords.png";
import { loginService } from "../../utilities/users-service";

const LoginForm = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService(userData);
      if (user !== null && user !== undefined) {
        toast.success("Successfully signed up!");
      }
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  return (
    <>
      <div className="relative -mt-16 block lg:hidden">
        <a
          className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 dark:bg-gray-900 sm:h-20 sm:w-20"
          href="/"
        >
          <span className="sr-only">Home</span>
          <img src={logo} />
        </a>

        <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
          Welcome to golf buddy ⛳️
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
          Golf buddy records and remembers for you so you can focus on playing
          your best.
        </p>
      </div>

      <form
        action="#"
        className="mt-8 grid grid-cols-6 gap-6"
        onSubmit={handleSubmit}
      >
        <div className="col-span-6">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Username
          </label>

          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            onChange={handleChange}
            value={userData.username}
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Password
          </label>

          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            onChange={handleChange}
            value={userData.password}
          />
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
            onClick={handleSubmit}
          >
            Log In
          </button>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            Don't have an account?{" "}
            <Link
              to="/accounts/register"
              className="text-gray-700 underline dark:text-gray-200"
            >
              Register for free
            </Link>
            .
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;