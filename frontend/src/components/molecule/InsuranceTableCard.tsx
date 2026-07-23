import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card"; // ShadCN Card components
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa"; // Trash, Edit, and Plus icons
import { format } from "date-fns"; // For formatting the date

// Define the type for Insurance
export type Insurance = {
  id: string;
  type: string;
  amount: string; // Assuming amount is a string like '2000' instead of a number
};

const InsuranceTableCard = ({
  insurances = [],
  handleDeleteInsurance,
  handleUpdateInsurance,
  handleAddInsurance, // This function will handle adding new insurance
}: {
  insurances: Insurance[];
  handleDeleteInsurance: (id: string) => void;
  handleUpdateInsurance: (id: string, updatedInsurance: Insurance) => void;
  handleAddInsurance: (newInsurance: Insurance) => void; // Accept a new insurance to be added
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editInsurance, setEditInsurance] = useState<Insurance | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false); // State for showing the add form
  const [newInsurance, setNewInsurance] = useState<Insurance>({
    id: "",
    type: "",
    amount: "",
  });

  // Function to handle form submission for adding new insurance
  const handleAdd = () => {
    if (newInsurance.type && newInsurance.amount) {
      newInsurance.id = "insurances_" + (insurances.length + 1);
      handleAddInsurance(newInsurance); // Pass new insurance to parent handler
      setIsAdding(false); // Close form
      setNewInsurance({ id: "", type: "", amount: "" }); // Reset form
    }
  };

  const handleCancelAdd = () => {
    setIsAdding(false); // Close form without adding
    setNewInsurance({ id: "", type: "", amount: "" }); // Reset form
  };

  const handleEdit = (insurance: Insurance) => {
    setEditInsurance(insurance);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editInsurance) {
      handleUpdateInsurance(editInsurance.id, editInsurance);
      setIsEditing(false);
      setEditInsurance(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditInsurance(null);
  };

  return (
    <Card className="bg-white">
      <CardHeader className="text-center text-lg font-semibold text-gray-500">
        Insurance Management
      </CardHeader>
      <CardContent>
        {/* Insurance Table */}
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-full table-auto text-sm text-gray-800">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="px-4 py-2">Insurance ID</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {insurances.map((insurance, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition-all duration-300"
                >
                  <td className="px-4 py-2">{insurance.id}</td>
                  <td className="px-4 py-2">
                    {isEditing && editInsurance?.id === insurance.id ? (
                      <input
                        type="text"
                        value={editInsurance.type}
                        onChange={(e) =>
                          setEditInsurance({
                            ...editInsurance,
                            type: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    ) : (
                      insurance.type
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {isEditing && editInsurance?.id === insurance.id ? (
                      <input
                        type="text"
                        value={editInsurance.amount}
                        onChange={(e) =>
                          setEditInsurance({
                            ...editInsurance,
                            amount: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    ) : (
                      insurance.amount
                    )}
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    {isEditing && editInsurance?.id === insurance.id ? (
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
                          onClick={() => handleEdit(insurance)}
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                        >
                          <FaEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteInsurance(insurance.id)}
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
              <FaPlus className="mr-2" />  Insurance
            </button>
          )}
        </div>

        {/* Form to add a new insurance */}
        {isAdding && (
          <div className="mb-4 p-4 border rounded-md">
            <h3 className="text-center text-lg font-semibold text-gray-500">
               Insurance
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-left block text-sm font-medium text-gray-500">
                  Insurance ID
                </label>
                <input
                  type="text"
                  value={"insurances_" + (insurances.length + 1)}
                  onChange={(e) =>
                    setNewInsurance({
                      ...newInsurance,
                      id: "insurances_" + (insurances.length + 1),
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Insurance ID"
                />
              </div>
              <div>
                <label className="text-left block text-sm font-medium text-gray-500">
                  Type
                </label>
                <input
                  type="text"
                  value={newInsurance.type}
                  onChange={(e) =>
                    setNewInsurance({ ...newInsurance, type: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Insurance Type"
                />
              </div>
              <div>
                <label className="block text-left text-sm font-medium text-gray-500">
                  Amount
                </label>
                <input
                  type="text"
                  value={newInsurance.amount}
                  onChange={(e) =>
                    setNewInsurance({
                      ...newInsurance,
                      amount: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Insurance Amount"
                />
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Add Insurance
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

export default InsuranceTableCard;
