import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card"; // ShadCN Card components
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa"; // Trash, Edit, and Plus icons
import { Liability } from "./LiabilityTableCard"; // Assuming Liability type is imported

const LiabilityTableCard = ({
  liabilities = [],
  handleDeleteLiability,
  handleUpdateLiability,
  handleAddLiability, // This function will handle adding new liabilities
}: {
  liabilities: Liability[];
  handleDeleteLiability: (id: number) => void;
  handleUpdateLiability: (id: number, updatedLiability: Liability) => void;
  handleAddLiability: (newLiability: any) => void; // Accept a new liability to be added
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editLiability, setEditLiability] = useState<Liability | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false); // State for showing the add form
  const [newLiability, setNewLiability] = useState<Liability>({
    id: 0,
    type: "",
    amount: 0,
    emi: 0,
  });

  // Function to handle form submission for adding new liability
  const handleAdd = () => {
    if (newLiability.type && newLiability.amount && newLiability.emi) {
      newLiability.id = "liability_" + Number(liabilities.length + 1); // Generate a new ID
      handleAddLiability(newLiability); // Pass new liability to parent handler
      setIsAdding(false); // Close form
      setNewLiability({ id: 0, type: "", amount: 0, emi: 0 }); // Reset form
    }
  };

  const handleCancelAdd = () => {
    setIsAdding(false); // Close form without adding
    setNewLiability({ id: 0, type: "", amount: 0, emi: 0 }); // Reset form
  };

  const handleEdit = (liability: Liability) => {
    setEditLiability(liability);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editLiability) {
      handleUpdateLiability(editLiability.id, editLiability);
      setIsEditing(false);
      setEditLiability(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditLiability(null);
  };

  return (
    <Card className="bg-white">
      <CardHeader className="text-center text-lg font-semibold text-gray-500">
        Liability Management
      </CardHeader>
      <CardContent>
        {/* Liability Table */}
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-full table-auto text-sm text-gray-800">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="px-4 py-2">Liability ID</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">EMI</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {liabilities.map((liability, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition-all duration-300"
                >
                  <td className="px-4 py-2">{liability.id}</td>
                  <td className="px-4 py-2">
                    {isEditing && editLiability?.id === liability.id ? (
                      <input
                        type="text"
                        value={editLiability.type}
                        onChange={(e) =>
                          setEditLiability({
                            ...editLiability,
                            type: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    ) : (
                      liability.type
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {isEditing && editLiability?.id === liability.id ? (
                      <input
                        type="number"
                        value={editLiability.amount}
                        onChange={(e) =>
                          setEditLiability({
                            ...editLiability,
                            amount: parseFloat(e.target.value),
                          })
                        }
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    ) : (
                      liability.amount
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {isEditing && editLiability?.id === liability.id ? (
                      <input
                        type="number"
                        value={editLiability.emi}
                        onChange={(e) =>
                          setEditLiability({
                            ...editLiability,
                            emi: parseFloat(e.target.value),
                          })
                        }
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    ) : (
                      liability.emi
                    )}
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    {isEditing && editLiability?.id === liability.id ? (
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
                          onClick={() => handleEdit(liability)}
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                        >
                          <FaEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteLiability(liability.id)}
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
        {/* Button to toggle  liability form */}
        <div className="mb-4 mt-8 text-center flex justify-end">
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              <FaPlus className="mr-2" /> Liability
            </button>
          )}
        </div>
        {/* Form to add a new liability */}
        {isAdding && (
          <div className="mb-4 p-4 border rounded-md">
            <h3 className="text-center text-lg font-semibold text-gray-500">
              Liability
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-left block text-sm font-medium text-gray-500">
                  Liability ID
                </label>
                <input
                  type="text"
                  value={"liability_" + (liabilities.length + 1)}
                  onChange={(e) =>
                    setNewLiability({
                      ...newLiability,
                      id: liabilities.length + 1,
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Liability ID"
                  disabled
                />
              </div>
              <div>
                <label className="text-left block text-sm font-medium text-gray-500">
                  Type
                </label>
                <input
                  type="text"
                  value={newLiability.type}
                  onChange={(e) =>
                    setNewLiability({ ...newLiability, type: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Liability Type"
                />
              </div>
              <div>
                <label className="block text-left text-sm font-medium text-gray-500">
                  Amount
                </label>
                <input
                  type="number"
                  value={newLiability.amount}
                  onChange={(e) =>
                    setNewLiability({
                      ...newLiability,
                      amount: parseFloat(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Liability Amount"
                />
              </div>
              <div>
                <label className="block text-left text-sm font-medium text-gray-500">
                  EMI
                </label>
                <input
                  type="number"
                  value={newLiability.emi}
                  onChange={(e) =>
                    setNewLiability({
                      ...newLiability,
                      emi: parseFloat(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter EMI"
                />
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Add Liability
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

export default LiabilityTableCard;
