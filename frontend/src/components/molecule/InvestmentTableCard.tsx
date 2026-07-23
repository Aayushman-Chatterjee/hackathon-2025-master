import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card"; // ShadCN Card components
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa"; // Trash, Edit, and Plus icons
import { format } from "date-fns"; // For formatting the date

// Define the type for Investment
export type Investment = {
  id: string;
  type: string;
  return: string; // The return as a percentage (e.g., '6%')
  amount: number;
};

const InvestmentTableCard = ({
  investments = [],
  handleDeleteInvestment,
  handleUpdateInvestment,
  handleAddInvestment, // This function will handle adding new investments
}: {
  investments: Investment[];
  handleDeleteInvestment: (id: string) => void;
  handleUpdateInvestment: (id: string, updatedInvestment: Investment) => void;
  handleAddInvestment: (newInvestment: Investment) => void; // Accept a new investment to be added
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editInvestment, setEditInvestment] = useState<Investment | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false); // State for showing the add form
  const [newInvestment, setNewInvestment] = useState<Investment>({
    id: "",
    type: "",
    return: "",
    amount: 0,
  });

  // Function to handle form submission for adding new investment
  const handleAdd = () => {
    if (newInvestment.type && newInvestment.return && newInvestment.amount) {
      newInvestment.id = "investments_" + (investments.length + 1);
      handleAddInvestment(newInvestment); // Pass new investment to parent handler
      setIsAdding(false); // Close form
      setNewInvestment({ id: "", type: "", return: "", amount: 0 }); // Reset form
    }
  };

  const handleCancelAdd = () => {
    setIsAdding(false); // Close form without adding
    setNewInvestment({ id: "", type: "", return: "", amount: 0 }); // Reset form
  };

  const handleEdit = (investment: Investment) => {
    setEditInvestment(investment);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editInvestment) {
      handleUpdateInvestment(editInvestment.id, editInvestment);
      setIsEditing(false);
      setEditInvestment(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditInvestment(null);
  };

  return (
    <Card className="bg-white">
      <CardHeader className="text-center text-lg font-semibold text-gray-500">
        Investment Management
      </CardHeader>
      <CardContent>
        {/* Investment Table */}
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-full table-auto text-sm text-gray-800">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="px-4 py-2">Investment ID</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Return</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition-all duration-300"
                >
                  <td className="px-4 py-2">{investment.id}</td>
                  <td className="px-4 py-2">
                    {isEditing && editInvestment?.id === investment.id ? (
                      <input
                        type="text"
                        value={editInvestment.type}
                        onChange={(e) =>
                          setEditInvestment({
                            ...editInvestment,
                            type: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    ) : (
                      investment.type
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {isEditing && editInvestment?.id === investment.id ? (
                      <input
                        type="text"
                        value={editInvestment.return}
                        onChange={(e) =>
                          setEditInvestment({
                            ...editInvestment,
                            return: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    ) : (
                      investment.return
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {isEditing && editInvestment?.id === investment.id ? (
                      <input
                        type="number"
                        value={editInvestment.amount}
                        onChange={(e) =>
                          setEditInvestment({
                            ...editInvestment,
                            amount: parseFloat(e.target.value),
                          })
                        }
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    ) : (
                      investment.amount
                    )}
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    {isEditing && editInvestment?.id === investment.id ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(investment)}
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                        >
                          <FaEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteInvestment(investment.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <FaTrashAlt className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-4 mt-8 text-center flex justify-end">
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              <FaPlus className="mr-2" />  Investment
            </button>
          )}
        </div>

        {/* Form to add a new investment */}
        {isAdding && (
          <div className="mb-4 p-4 border rounded-md">
            <h3 className="text-center text-lg font-semibold text-gray-500">
               Investment
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-left block text-sm font-medium text-gray-500">
                  Investment ID
                </label>
                <input
                  type="text"
                  value={"investments_" + (investments.length + 1)}
                  onChange={(e) =>
                    setNewInvestment({
                      ...newInvestment,
                      id: "investments_" + (investments.length + 1),
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Investment ID"
                />
              </div>
              <div>
                <label className="text-left block text-sm font-medium text-gray-500">
                  Type
                </label>
                <input
                  type="text"
                  value={newInvestment.type}
                  onChange={(e) =>
                    setNewInvestment({ ...newInvestment, type: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Investment Type"
                />
              </div>
              <div>
                <label className="block text-left text-sm font-medium text-gray-500">
                  Return
                </label>
                <input
                  type="text"
                  value={newInvestment.return}
                  onChange={(e) =>
                    setNewInvestment({
                      ...newInvestment,
                      return: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Investment Return (e.g. 6%)"
                />
              </div>
              <div>
                <label className="block text-left text-sm font-medium text-gray-500">
                  Amount
                </label>
                <input
                  type="number"
                  value={newInvestment.amount}
                  onChange={(e) =>
                    setNewInvestment({
                      ...newInvestment,
                      amount: parseFloat(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Investment Amount"
                />
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Add Investment
                </button>
                <button
                  onClick={handleCancelAdd}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InvestmentTableCard;
