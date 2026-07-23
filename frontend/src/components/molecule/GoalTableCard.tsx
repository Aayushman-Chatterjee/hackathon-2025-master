import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card"; // ShadCN Card components
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa"; // Trash, Edit, and Plus icons
import { Goal } from "./GoalTableCard"; // Assuming Goal type is imported from GoalCard
import { format } from "date-fns"; // For formatting the date

const GoalTableCard = ({
  goals = [],
  handleDeleteGoal,
  handleUpdateGoal,
  handleAddGoal, // This function will handle adding new goals
}: {
  goals: Goal[];
  handleDeleteGoal: (id: string) => void;
  handleUpdateGoal: (id: string, updatedGoal: Goal) => void;
  handleAddGoal: (newGoal: Goal) => void; // Accept a new goal to be added
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editGoal, setEditGoal] = useState<Goal | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false); // State for showing the add form
  const [newGoal, setNewGoal] = useState<Goal>({
    id: "",
    date: new Date(),
    type: "",
    amount: 0,
  });

  // Function to handle form submission for adding new goal
  const handleAdd = () => {
    if (newGoal.type && newGoal.amount) {
      newGoal.id = "goal_" + (goals.length + 1);
      handleAddGoal(newGoal); // Pass new goal to parent handler
      setIsAdding(false); // Close form
      setNewGoal({ id: "", date: new Date(), type: "", amount: 0 }); // Reset form
    }
  };

  const handleCancelAdd = () => {
    setIsAdding(false); // Close form without adding
    setNewGoal({ id: "", date: new Date(), type: "", amount: 0 }); // Reset form
  };

  const handleEdit = (goal: Goal) => {
    setEditGoal(goal);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editGoal) {
      handleUpdateGoal(editGoal.id, editGoal);
      setIsEditing(false);
      setEditGoal(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditGoal(null);
  };

  return (
    <Card className="bg-white">
      <CardHeader className="text-center text-lg font-semibold text-gray-500">
        Goal Management
      </CardHeader>
      <CardContent>
        {/* Goal Table */}
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-full table-auto text-sm text-gray-800">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="px-4 py-2">Goal ID</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition-all duration-300"
                >
                  <td className="px-4 py-2">{goal.id}</td>
                  <td className="px-4 py-2">
                    {isEditing && editGoal?.id === goal.id ? (
                      <input
                        type="date"
                        value={format(new Date(editGoal.date), "yyyy-MM-dd")}
                        onChange={(e) =>
                          setEditGoal({
                            ...editGoal,
                            date: new Date(e.target.value),
                          })
                        }
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    ) : (
                      format(new Date(goal.date), "dd/MM/yyyy")
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {isEditing && editGoal?.id === goal.id ? (
                      <input
                        type="text"
                        value={editGoal.type}
                        onChange={(e) =>
                          setEditGoal({ ...editGoal, type: e.target.value })
                        }
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    ) : (
                      goal.type
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {isEditing && editGoal?.id === goal.id ? (
                      <input
                        type="number"
                        value={editGoal.amount}
                        onChange={(e) =>
                          setEditGoal({
                            ...editGoal,
                            amount: parseFloat(e.target.value),
                          })
                        }
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    ) : (
                      goal.amount
                    )}
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    {isEditing && editGoal?.id === goal.id ? (
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
                          onClick={() => handleEdit(goal)}
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                        >
                          <FaEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteGoal(goal.id)}
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
              <FaPlus className="mr-2" />  Goal
            </button>
          )}
        </div>

        {/* Form to add a new goal */}
        {isAdding && (
          <div className="mb-4 p-4 border rounded-md">
            <h3 className="text-center text-lg font-semibold text-gray-500">
               Goal
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-left block text-sm font-medium text-gray-500">
                  Goal ID
                </label>
                <input
                  type="text"
                  value={"goal_" + Number(goals.length + 1)}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, id: "goal_" + (goals.length + 1) })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Goal ID"
                />
              </div>
              <div>
                <label className="text-left block text-sm font-medium text-gray-500">
                  Date
                </label>
                <input
                  type="date"
                  value={format(new Date(newGoal.date), "yyyy-MM-dd")}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, date: new Date(e.target.value) })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-left block text-sm font-medium text-gray-500">
                  Type
                </label>
                <input
                  type="text"
                  value={newGoal.type}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, type: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Goal Type"
                />
              </div>
              <div>
                <label className="block text-left text-sm font-medium text-gray-500">
                  Amount
                </label>
                <input
                  type="number"
                  value={newGoal.amount}
                  onChange={(e) =>
                    setNewGoal({
                      ...newGoal,
                      amount: parseFloat(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Goal Amount"
                />
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Add Goal
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

export default GoalTableCard;
