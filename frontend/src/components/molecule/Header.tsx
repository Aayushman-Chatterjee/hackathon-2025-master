import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import {
  checkUserUpodates,
  getUserData,
  saveUserData,
} from "@/lib/firebase.util";
import useUserStore from "@/store/index";
import {
  ArrowLeft,
  ArrowRight,
  HandCoins,
  HandCoinsIcon,
  LogOutIcon,
  SaveAllIcon,
} from "lucide-react";

export const Header = () => {
  const navigate = useNavigate(); // Instantiate the navigate function
  const [isProfilePage, setIsProfilePage] = useState(false); // State to track if we are on the profile page

  const userData = useUserStore((state) => state.userData);
  const userId = useUserStore((state) => state.userId);
  const setUserId = useUserStore((state) => state.setUserId);
  const setUserData = useUserStore((state) => state.setUserData);
  const [loading, setLoading] = useState(false);
  const [isProcess, setIsProcess] = useState<
    "stale" | "processing" | "processed"
  >("stale");

  // Toggle button text and navigate to the profile page or dashboard

  const handleLogout = () => {
    setUserId("");
    setUserData({});
    navigate("/");
    // Handle your logout logic here (e.g., clearing session or redirecting)
    console.log("Logged out!");
  };

  const handleProfileClick = () => {
    if (isProfilePage) {
      setIsProfilePage(false); // Go back to dashboard
      navigate("/dashboard"); // Navigate to the dashboard
    } else {
      setIsProfilePage(true); // Change state to profile
      navigate("/profilepage"); // Navigate to profile page
    }
  };

  const checkUpdates = async () => {
    let count = 0; // Variable to track the interval

    // Set an interval that runs every second (1000 milliseconds)
    const intervalId = setInterval(async () => {
      console.log("Interval running:", count);

      const isUpdated = await checkUserUpodates(userId);

      // Check if the condition is met (e.g., after 5 seconds)
      if (isUpdated?.ready) {
        setIsProcess("processed");
        console.log("Condition met, clearing interval!");
        const res = await getUserData(userId);
        await setUserData(res);
        // Clear the interval after the condition is true
        clearInterval(intervalId);
      }
    }, 5000); // 1000 milliseconds = 1 second
  };

  const handleSaveAllData = async () => {
    setLoading(true); // Optional: Set loading state to true while saving
    setIsProcess("processing");
    try {
      // Prepare the data to be sent to the backend
      const payload = {
        ...userData,
      };
      const payloadNew = JSON.parse(JSON.stringify(payload));
      delete payloadNew?.recommendations;
      delete payloadNew?.basic_info?.profile_score;
      const response = await saveUserData(userId, payloadNew, true);
      checkUpdates();
      if (response.status === 200) {
        // Handle success, maybe show a success message or refresh data
        console.log("Data saved successfully");
      } else {
        // Handle error
        console.error("Error saving data:", response);
      }
    } catch (error) {
      // Handle error (show message, etc.)
      console.error("Error saving data:", error);
    } finally {
      setLoading(false); // Set loading to false once the process is done
    }
  };

  return (
    <header className="text-gray-600 body-font w-full px-4">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row justify-between">
        <div className="flex gap-7">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <div className="bg-melrose-500 p-2 rounded-full">
              <HandCoinsIcon className="text-white" />
            </div>
            <span className="ml-3 text-xl text-black dark:text-white">
              Wealthify
            </span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <a
              onClick={() => navigate("/dashboard")}
              className="mr-5 text-neutral-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
            >
              Dashboard
            </a>
          </nav>
        </div>

        {/* Toggle button text based on the profile page state */}
        <div className="flex gap-7">
          {isProcess !== "stale" && (
            <span
              className={`flex items-center ${
                isProcess == "processed" ? `text-green-600` : `text-black-600`
              } py-2 px-4 focus:outline-none transition-all duration-300`}
            >
              {isProcess == "processed" ? "Recently Updated" : "Updating..."}
            </span>
          )}
          <button
            onClick={handleProfileClick}
            className="inline-flex gap-1 items-center border border-melrose-500 text-melrose-500 hover:border-melrose-600 hover:text-melrose-600 active:border-melrose-700 active:text-melrose-700 rounded-xl py-1 px-3 focus:outline-none text-base mt-4 md:mt-0"
          >
            {isProfilePage && <ArrowLeft size={14} className="" />}

            {isProfilePage ? "Back To Dashboard" : "My Profile"}

            {!isProfilePage && <ArrowRight size={16} />}
          </button>
          {isProfilePage && (
            <div className="flex justify-right">
              <button
                disabled={loading || isProcess === "processing"}
                onClick={handleSaveAllData}
                className="px-4 py-0 bg-gradient-to-b border-t-2 border-melrose-400  hover:border-melrose-500  active:border-melrose-600  from-melrose-500  to-melrose-600  hover:from-melrose-600  hover:to-melrose-700    active:from-melrose-700    active:to-melrose-700 disabled:from-gray-500 disabled:to-gray-600    rounded-lg text-white transition-colors inline-flex gap-2 items-center"
              >
                <SaveAllIcon size={14} />
                Save All Data
              </button>
            </div>
          )}
          {
            <button
              onClick={handleLogout}
              className="flex gap-2 items-center bg-melrose-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none transition-all duration-300"
            >
              <LogOutIcon size={14} />
            </button>
          }
        </div>
      </div>
    </header>
  );
};
