import React, { useState } from "react";
import { HiHome } from "react-icons/hi"; // Icon for assets
import { FaTrashAlt } from "react-icons/fa"; // Trash icon for deleting asset
import { MdAddCircle } from "react-icons/md"; // Icon for adding new asset

const AssetCard = ({
  assets,
  basicInfo,
  handleAddAsset,
  handleDeleteAsset,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState({
    type: "",
    value: "",
  });

  const [gradient, setGradient] = useState(
    "bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600"
  );

  const handleAddAssets = async () => {
    await handleAddAsset({ asset: newAsset.type, value: newAsset.value });
    setNewAsset({ type: "", value: "" });
    setIsModalOpen(false);
  };

  // // Change gradient dynamically
  // const changeGradient = () => {
  //   const gradients = [
  //     "bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600",
  //   ];
  //   const randomIndex = Math.floor(Math.random() * gradients.length);
  //   setGradient(gradients[randomIndex]);
  // };

  return (
    <div
      className={`bg-gradient-to-br ${gradient} shadow-xl rounded-lg p-6 flex flex-col space-y-6 hover:scale-105 transition-all duration-300 h-full`}
    >
      <div className="flex items-center space-x-3">
        <HiHome className="h-8 w-8 text-white" />
        <h2 className="text-2xl font-semibold text-white">Your Assets</h2>
      </div>

      {/* Asset Info Header */}
      <div className="grid grid-cols-2 gap-6 border-b pb-3 mb-4">
        <span className="font-medium text-white">Type</span>
        <span className="font-medium text-white">Value</span>
      </div>

      {/* Loop through assets */}
      {assets.map((asset, index) => (
        <div
          key={index}
          className="grid grid-cols-2 gap-6 items-center border-b py-3 hover:bg-teal-50 transition-all duration-300"
        >
          <span className="text-white">{asset.type}</span>
          <span className="text-white">
            {asset.value} {basicInfo.currency}
          </span>
          <button
            onClick={() => handleDeleteAsset(index)}
            className="text-red-500 hover:text-red-700 text-right"
          >
            <FaTrashAlt className="h-5 w-5" />
          </button>
        </div>
      ))}

      {/*  Asset Button */}
      <div className="mt-auto">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-6 py-3 mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:bg-gradient-to-l focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
        >
          <MdAddCircle className="h-5 w-5" />
          <span> Asset</span>
        </button>
      </div>

      {/* Modal for Adding New Asset */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
               Asset
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Asset Type"
                value={newAsset.type}
                onChange={(e) =>
                  setNewAsset({ ...newAsset, type: e.target.value })
                }
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
              <input
                type="number"
                placeholder="Asset Value"
                value={newAsset.value}
                onChange={(e) =>
                  setNewAsset({ ...newAsset, value: e.target.value })
                }
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAssets}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md"
              >
                Add Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetCard;
