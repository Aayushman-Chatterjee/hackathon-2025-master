import React from "react";
import { useNavigate } from "react-router-dom";
import { FINANCIAL_CATEGORIES } from "../MockData/categories";
import useStore from "../store";

// Categories (you can expand this with more financial categories)

const CategoryPage = () => {
  const navigate = useNavigate();
  const { setUserData } = useStore();

  const handleCategorySelection = (categoryName) => {
    // Navigate to the profile page based on category selection
    const selectedCategory = FINANCIAL_CATEGORIES.find(
      (category) => category.name === categoryName
    );
    setUserData({ userData: selectedCategory.data });
    navigate(`/dashboard`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-white mb-6">
          Choose Your Financial Path
        </h1>
        <p className="text-xl text-white mb-8">
          Select a category to begin your investment journey
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FINANCIAL_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => handleCategorySelection(category.name)}
            >
              <div className="p-6 bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white rounded-t-lg">
                <h2 className="text-2xl font-semibold">{category.name}</h2>
              </div>
              <div className="p-4">
                <p className="text-gray-700">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
