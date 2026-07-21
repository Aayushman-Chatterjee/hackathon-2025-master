import React, { useState } from "react";
import { HiCreditCard, HiPlus, HiTrash } from "react-icons/hi"; // Icons for liabilities

const LiabilitiesCard = ({
  liabilities,
  handleAddLiability,
  handleDeleteLiability,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [liabilityToDelete, setLiabilityToDelete] = useState(null);
  const [newLiability, setNewLiability] = useState({
    type: "",
    amount: "",
  });

  // Handle adding a new liability
  const onhandleAddLiability = () => {
    if (newLiability.type && newLiability.amount) {
      const newLiabilityData = {
        id: Date.now(),
        type: newLiability.type,
        amount: parseFloat(newLiability.amount),
      };
      handleAddLiability(newLiabilityData);
      // setLiabilities([...liabilities, newLiabilityData]);
      setNewLiability({ type: "", amount: "" }); // Reset the form
      setIsAddModalOpen(false); // Close the modal
    } else {
      alert("Please fill out all fields");
    }
  };

  // Handle opening the delete modal
  const onhandleOpenDeleteModal = (liability) => {
    setLiabilityToDelete(liability);
    setIsDeleteModalOpen(true);
  };

  // Handle deleting a liability
  const onhandleDeleteLiability = (index) => {
    if (liabilityToDelete) {
      handleDeleteLiability(index);
      setIsDeleteModalOpen(false); // Close the modal
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 shadow-xl rounded-lg p-6 flex flex-col space-y-4 hover:scale-105 transition-all duration-300 h-full">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <HiCreditCard className="h-8 w-8 text-white" />
        <h2 className="text-2xl font-semibold text-white">Liabilities</h2>
      </div>
      {/* If no liabilities */}
      {liabilities.length === 0 ? (
        <div className="text-center text-gray-300">No Liabilities</div>
      ) : (
        <div className="min-h-[240px] max-h-[300px] overflow-y-auto">
          {liabilities.map((liability, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-4 border-b pb-2 text-white"
            >
              <div className="flex-1">
                <span>{liability.type}</span>
                <div>{liability.amount} USD</div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDeleteLiability(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <HiTrash className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Add Liability Button */}
      <div className="flex-grow" /> {/* This pushes the button to the bottom */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="flex items-center space-x-2 px-6 py-3 mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:bg-gradient-to-l focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
      >
        <HiPlus className="h-5 w-5" />
        <span>Add Liability</span>
      </button>
      {/* Add Liability Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
               Liability
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Liability Type"
                value={newLiability.type}
                onChange={(e) =>
                  setNewLiability({ ...newLiability, type: e.target.value })
                }
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
              <input
                type="number"
                placeholder="Liability Amount"
                value={newLiability.amount}
                onChange={(e) =>
                  setNewLiability({ ...newLiability, amount: e.target.value })
                }
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={onhandleAddLiability}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md"
              >
                Add Liability
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Liability Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Are you sure you want to delete this liability?
            </h3>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={onhandleDeleteLiability(index)}
                className="px-6 py-3 bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiabilitiesCard;
