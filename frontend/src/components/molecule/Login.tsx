import { getUserData } from "@/lib/firebase.util";
import useUserStore from "@/store/index";
import { HandCoinsIcon } from "lucide-react";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy credentials for login (you can replace this with a real API or database check)
const DUMMY_CREDENTIALS = {
  username: "user_1003",
  password: "123",
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // For signup
  const [error, setError] = useState(""); // For error messages
  const [isSignUp, setIsSignUp] = useState(false); // For toggling between Login and SignUp
  const navigate = useNavigate();
  const setUserId = useUserStore((state) => state.setUserId);

  const setUserData = useUserStore((state) => state.setUserData);

  const userId = useUserStore((state) => state.userId);

  const userData = useUserStore((state) => state.userData);

  const handleLogin = async () => {
    // Check if fields are empty
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    // Check if it's an existing user
    try {
      const res = await getUserData(username);
      console.log("Fetched user data:", res);
      if (res) {
        setUserData(res); // Update Zustand store with fetched data
        setUserId(username);
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Invalid credentials.");
    }

    // if (
    //   username === DUMMY_CREDENTIALS.username &&
    //   password === DUMMY_CREDENTIALS.password
    // ) {
    //   setUserId(username);
    //   navigate("/dashboard"); // Redirect to dashboard if existing user
    // } else {
    //   setError("Invalid credentials.");
    // }
  };

  const handleSignUp = () => {
    // Check if fields are empty
    if (!username || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Simulate successful sign-up
    setError(""); // Clear error message
    setIsSignUp(false); // Switch back to login
    setUserId(username);
    handleCategorySelection("xyz"); // Proceed to category selection
  };

  const handleCategorySelection = (category: any) => {
    // Navigate to a page that loads data based on category
    navigate(`/category/${category}`);
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center animate-gradient w-full">
      <div className="flex gap-2 justify-center items-center my-4">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <div className="bg-melrose-500 p-2 rounded-full">
            <HandCoinsIcon className="text-white" />
          </div>
          <span className="ml-3 text-xl text-black dark:text-white">
            Wealthify
          </span>
        </a>
      </div>
      <div className="w-full max-w-sm p-8 bg-white border backdrop-blur-lg rounded-2xl transform transition-all duration-500">
        {!isSignUp ? (
          <>
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 animate__animated animate__fadeIn">
              Login
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-melrose-500  transition duration-300"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-melrose-500  transition duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-6">
              <button
                className="w-full py-3 bg-gradient-to-b from-melrose-500 to-melrose-600 text-white rounded-lg shadow-md hover:from-melrose-600 hover:to-melrose-700   active:from-melrose-700   active:to-cerulean-800"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className="mt-4 text-center">
              <p>
                Don't have an account?{" "}
                <button
                  className="text-melrose-500 hover:underline"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 animate__animated animate__fadeIn">
              Sign Up
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:from-melrose-500 transition duration-300"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:from-melrose-500 transition duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:from-melrose-500 transition duration-300"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-6">
              <button
                className="w-full py-3 bg-gradient-to-b from-melrose-500 to-melrose-600 text-white rounded-lg shadow-md hover:from-melrose-600 hover:to-melrose-700   active:from-melrose-700   active:to-cerulean-800"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
            <div className="mt-4 text-center">
              <p>
                Already have an account?{" "}
                <button
                  className="text-melrose-600 hover:underline"
                  onClick={() => setIsSignUp(false)}
                >
                  Login
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
