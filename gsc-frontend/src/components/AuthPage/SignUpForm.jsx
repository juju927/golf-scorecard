import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../assets/images/golf-buddy-logo-nowords.png";
import AuthHeader from "./AuthHeader";
import { signUpService } from "../../utilities/users-service";
import { useAtom, useSetAtom } from "jotai";
import { userAtom, userProfileAtom } from "../../utilities/atom";
import { useNavigate } from "react-router-dom";
import Loading from "../common/Loading";
import { useEffect } from "react";
import validator from "validator";

const SignUpForm = () => {
  const [user, setUser] = useAtom(userAtom);
  const setUserProfile = useSetAtom(userProfileAtom);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    passwordconfirm: "",
  });
  const [isValid, setIsValid] = useState({
    email: false,
    username: false,
    password: false,
    passwordconfirm: false,
  });

  const checkIfValid = (field, value) => {
    var isFieldValid = false;
    switch (field) {
      case "email":
        isFieldValid = validator.isEmail(value);
        break;
      case "username":
        isFieldValid =
          validator.isAlphanumeric(value) &&
          validator.isLength(value, { min: 4, max: 30 });
        break;
      case "password":
        isFieldValid = validator.isLength(value, { min: 8 });
        break;
      case "passwordconfirm":
        isFieldValid = userData.password == value;
        break;
    }
    setIsValid({
      ...isValid,
      [field]: isFieldValid,
    });
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    checkIfValid(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.passwordconfirm) {
      toast.error("Passwords do not match.");
      return;
    }

    if (Object.values(isValid).includes(false)) {
      return;
    }

    setIsLoading(true);
    try {
      const user = await signUpService(userData);
      if (user !== null && user !== undefined) {
        setUser(user);
        setUserProfile(user.profile || {});
        toast.success("Successfully signed up!");
        navigate("/setup");
      }
    } catch (err) {
      toast.error(`${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user !== null && user !== undefined) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <AuthHeader />
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
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
                Golf buddy records and remembers for you so you can focus on
                playing your best.
              </p>
            </div>

            <form
              className="mt-8 grid grid-cols-6 gap-6"
              onSubmit={handleSubmit}
            >
              <div className="col-span-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  onChange={handleChange}
                  value={userData.email}
                  disabled={isLoading}
                />
                <p
                  className={`${
                    isValid.email ? "invisible" : "visible"
                  } text-xs text-red-500`}
                >
                  Please enter a valid email address.
                </p>
              </div>

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
                  disabled={isLoading}
                />
                <p
                  className={`${
                    isValid.username ? "invisible" : "visible"
                  } text-xs text-red-500`}
                >
                  Username must be between 4 - 30 characters long and cannot
                  contain symbols.
                </p>
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
                  disabled={isLoading}
                />
                <p
                  className={`${
                    isValid.password ? "invisible" : "visible"
                  } text-xs text-red-500`}
                >
                  Password must contain at least 8 characters.
                </p>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="passwordConfirmation"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Password Confirmation
                </label>

                <input
                  type="password"
                  id="passwordConfirmation"
                  name="passwordconfirm"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  onChange={handleChange}
                  value={userData.passwordconfirm}
                  disabled={isLoading}
                  
                />
                <p
                  className={`${
                    isValid.passwordconfirm ? "invisible" : "visible"
                  } text-xs text-red-500`}
                >
                  Passwords must match.
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <div className="flex items-center gap-2">
                  <button
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white disabled:bg-blue-700/30 disabled:border-none disabled:text-white/30"
                    onClick={handleSubmit}
                    disabled={(Object.values(isValid).includes(false))}
                  >
                    Create an account
                  </button>
                  {isLoading && <Loading />}
                </div>

                <p className="mt-4 text-sm text-gray-400 sm:mt-0">
                  Already have an account?{" "}
                  <Link to="/login" className="text-gray-200 underline">
                    Log in
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignUpForm;
