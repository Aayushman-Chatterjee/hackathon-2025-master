import React, { useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa"; // Icons for Add and Delete
import { HiCash } from "react-icons/hi"; // Cash icon for wishlist

const WishlistCard = ({
  wishlist,
  onAddWishlistItem,
  onDeleteWishlistItem,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [expandedItem, setExpandedItem] = useState(null); // Track expanded item

  const handleAddItem = async () => {
    if (newItemName.trim()) {
      await onAddWishlistItem(newItemName); // Call the function to add the item
      setNewItemName(""); // Reset the input field
      setIsModalOpen(false); // Close the modal
    }
  };

  const handleExpandItem = (index) => {
    setExpandedItem(index === expandedItem ? null : index); // Toggle expansion
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 shadow-xl rounded-lg p-6 flex flex-col space-y-4 hover:scale-105 transition-all duration-300 h-full">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <HiCash className="h-8 w-8 text-white" />
        <h2 className="text-2xl font-semibold text-white">Wishlist</h2>
      </div>
      {/* If no items in the wishlist */}
      {wishlist.length === 0 ? (
        <div className="text-center text-gray-300">Empty Wishlist</div>
      ) : (
        <div className="min-h-[240px] max-h-[300px] overflow-y-auto">
          {/* This makes the list scrollable vertically */}
          {wishlist.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-4 border-b pb-2 text-white"
            >
              <div className="flex-1">
                {/* Show first 100 chars with "..." if necessary */}
                <span>
                  {expandedItem === index
                    ? item.name
                    : item.name.length > 100
                    ? `${item.name.substring(0, 100)}...`
                    : item.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleExpandItem(index)}
                  className="text-indigo-200 hover:text-indigo-400 text-sm"
                >
                  {expandedItem === index ? "View Less" : "View More"}
                </button>
                <button
                  onClick={() => onDeleteWishlistItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Add Wishlist Item Button */}
      <div className="flex-grow" /> {/* This pushes the button to the bottom */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center space-x-2 px-6 py-3 mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:bg-gradient-to-l focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
      >
        <FaPlus className="h-5 w-5" />
        <span>Add Wishlist Item</span>
      </button>
      {/* Modal for adding new wishlist item */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
               Wishlist Item
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Item Name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
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
                onClick={handleAddItem}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistCard;
