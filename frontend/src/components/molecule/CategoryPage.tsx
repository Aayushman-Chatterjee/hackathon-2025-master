import { saveUserData, getUserData } from "@/lib/firebase.util";
import useUserStore from "@/store/index";
// import { getUserData } from "@/utils/firebase.utils";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FINANCIAL_CATEGORIES } from "./Mock_Categories"; // Assuming this contains category info and image URLs

const CategoryPage = () => {
  const navigate = useNavigate();
  const setUserId = useUserStore((state) => state.setUserId);

  const setUserData = useUserStore((state) => state.setUserData);

  const userId = useUserStore((state) => state.userId);

  const userData = useUserStore((state) => state.userData);

  const handleCategorySelection = async (categoryName: string) => {
    // Navigate to the dashboard page based on category selection
    const selectedCategory = FINANCIAL_CATEGORIES.find(
      (category) => category.type === categoryName
    );
    const financialUsers = {
      Average_Investor: "user_1001",
      Investment_Master: "user_1002",
      Safe_Master: "user_1003",
      High_Expenses: "user_1004",
    };
    try {
      const res = await getUserData(financialUsers[selectedCategory?.type]);

      console.log("Fetched user data:", res);
      if (res) {
        const payloadNew = JSON.parse(JSON.stringify(res));
        delete payloadNew?.recommendations;
        const saveData = await saveUserData(userId, payloadNew, false);
        await setUserData(res); // Update Zustand store with fetched data
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Invalid credentials.");
    }
    // Set user data (if applicable) and navigate
  };

  return (
    <div className="min-h-screen   p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-black mb-6">
          Choose Your Financial Path
        </h1>
        <p className="text-xl text-black mb-8">
          Select a category to begin your investment journey
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {FINANCIAL_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="bg-white text-black rounded-lg shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => handleCategorySelection(category.type)}
            >
              <div className="p-6 bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white rounded-t-lg">
                <h2 className="text-xl font-semibold">
                  {category.type.split("_").join(" ")}
                </h2>
              </div>
              <div className="p-4">
                <p className="text-gray-700">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    // <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 p-8 flex justify-center items-center">
    //   <div className="relative w-[700px] h-[700px] flex justify-center items-center">
    //     {/* Outer Circular Container */}
    //     <div className="relative w-[700px] h-[700px] rounded-full border-4 border-black flex justify-center items-center">
    //       {/* Categories arranged along the perimeter */}
    //       {FINANCIAL_CATEGORIES.map((category, index) => {
    //         // Positioning each category along the perimeter (adjusting with trigonometry)
    //         const angle = (360 / FINANCIAL_CATEGORIES.length) * index; // Equally space out categories
    //         const top = 50 + 50 * Math.sin((angle * Math.PI) / 180); // Adjust these values for proper placement
    //         const left = 50 + 50 * Math.cos((angle * Math.PI) / 180); // Adjust for perimeter positioning

    //         return (
    //           <div
    //             key={category.id}
    //             className="absolute cursor-pointer w-24 h-24"
    //             style={{
    //               top: `${top}%`,
    //               left: `${left}%`,
    //               transform: "translate(-50%, -50%)",
    //             }}
    //             onClick={() => handleCategorySelection(category.type)}
    //           >
    //             <div className="w-full h-full bg-white rounded-full shadow-lg flex justify-center items-center transition-all duration-300 transform hover:scale-110 group">
    //               {/* Category Image */}
    //               <div
    //                 className="w-full h-full bg-cover bg-center rounded-full"
    //                 style={{ backgroundImage: `url(${category.image})` }}
    //               ></div>
    //               {/* Gradient Overlay */}
    //               <div className="w-full h-full absolute inset-0 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white rounded-full opacity-75 group-hover:opacity-90 transition-opacity duration-300"></div>
    //             </div>
    //             {/* Hover Box (Rectangle) Below the Circle */}
    //             <div className="absolute bottom-[-40px] w-[250px] text-center text-white p-2 bg-black bg-opacity-80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    //               <p className="text-xs">{category.description}</p>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //     {/* Centered Title */}
    //     <div className="absolute inset-0 flex justify-center items-center">
    //       <h1 className="text-4xl font-extrabold text-white z-10">
    //         Choose Your Financial Path
    //       </h1>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CategoryPage;
