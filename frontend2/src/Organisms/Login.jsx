import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy credentials for login (you can replace this with a real API or database check)
const DUMMY_CREDENTIALS = {
  username: "testuser",
  password: "123",
};

// Dummy categories (you can replace this with your actual categories)
const CATEGORIES = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Health" },
  { id: 3, name: "Sports" },
  { id: 4, name: "Business" },
];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // For signup
  const [error, setError] = useState(""); // For error messages
  const [isSignUp, setIsSignUp] = useState(false); // For toggling between Login and SignUp
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check if fields are empty
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    // Check if it's an existing user
    if (
      username === DUMMY_CREDENTIALS.username &&
      password === DUMMY_CREDENTIALS.password
    ) {
      navigate("/dashboard"); // Redirect to dashboard if existing user
    } else {
      setError("Invalid credentials.");
    }
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
    handleCategorySelection("xyz"); // Proceed to category selection
  };

  const handleCategorySelection = (category) => {
    // Navigate to a page that loads data based on category
    navigate(`/category/${category}`);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 animate-gradient">
      <div className="w-full max-w-sm p-8 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105">
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
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
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
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-6">
              <button
                className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className="mt-4 text-center">
              <p>
                Don't have an account?{" "}
                <button
                  className="text-indigo-600 hover:underline"
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
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
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
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
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
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-6">
              <button
                className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
            <div className="mt-4 text-center">
              <p>
                Already have an account?{" "}
                <button
                  className="text-indigo-600 hover:underline"
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
