import React, { useState } from "react";
import { FaPlus, FaTrashAlt, FaCar } from "react-icons/fa"; // Icons for Add and Delete

const InvestmentsCard = ({
  investments,
  setInvestments,
  handleAddInvestment,
  handleDeleteInvestment,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [investmentToDelete, setInvestmentToDelete] = useState(null);
  const [newInvestment, setNewInvestment] = useState({
    name: "",
    amount: "",
  });

  // Handle adding a new investment
  const onhandleAddInvestment = () => {
    if (newInvestment.name && newInvestment.amount) {
      const newInvestmentData = {
        id: Date.now(),
        name: newInvestment.name,
        amount: parseFloat(newInvestment.amount),
      };
      handleAddInvestment(newInvestmentData);
      setNewInvestment({ name: "", amount: "" }); // Reset the form
      setIsAddModalOpen(false); // Close the modal
    } else {
      alert("Please fill out all fields");
    }
  };

  // // Handle opening the delete modal
  // const handleOpenDeleteModal = (investment) => {
  //   setInvestmentToDelete(investment);
  //   setIsDeleteModalOpen(true);
  // };

  return (
    <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 shadow-xl rounded-lg p-6 flex flex-col space-y-4 hover:scale-105 transition-all duration-300 h-full">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <FaCar className="h-8 w-8 text-white" />
        <h2 className="text-2xl font-semibold text-white">Investments</h2>
      </div>
      {/* If no investments */}
      {investments.length === 0 ? (
        <div className="text-center text-gray-300">No Investments</div>
      ) : (
        <div className="min-h-[240px] max-h-[300px] overflow-y-auto">
          {investments.map((investment, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-4 border-b pb-2 text-white"
            >
              <div className="flex-1">
                <span>{investment.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDeleteInvestment(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Add Investment Button */}
      <div className="flex-grow" /> {/* This pushes the button to the bottom */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="flex items-center space-x-2 px-6 py-3 mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:bg-gradient-to-l focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
      >
        <FaPlus className="h-5 w-5" />
        <span>Add Investment</span>
      </button>
      {/* Add Investment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
               Investment
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Investment Name"
                value={newInvestment.name}
                onChange={(e) =>
                  setNewInvestment({ ...newInvestment, name: e.target.value })
                }
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
              <input
                type="number"
                placeholder="Investment Amount"
                value={newInvestment.amount}
                onChange={(e) =>
                  setNewInvestment({ ...newInvestment, amount: e.target.value })
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
                onClick={onhandleAddInvestment}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md"
              >
                Add Investment
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Investment Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Are you sure you want to delete this investment?
            </h3>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteInvestment(index)}
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

export default InvestmentsCard;
