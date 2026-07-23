import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card"; // ShadCN Card components
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa"; // Trash, Edit, and Plus icons
import { format } from "date-fns"; // For formatting the date

// Define the type for Transaction
export type Transaction = {
  id: string;
  category: string;
  amount: number;
  transaction_date: string; // Format as 'YYYY-MM-DD'
  transaction_type: string; // 'Debit' or 'Credit'
};

const TransactionTableCard = ({
  transactions = [],
  handleDeleteTransaction,
  handleUpdateTransaction,
  ganerateRandomTransactions,
  handleAddTransaction, // This function will handle adding new transactions
}: {
  transactions: Transaction[];
  handleDeleteTransaction: (id: string) => void;
  ganerateRandomTransactions: any;
  handleUpdateTransaction: (
    id: string,
    updatedTransaction: Transaction
  ) => void;
  handleAddTransaction: (newTransaction: Transaction) => void; // Accept a new transaction to be added
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(
    null
  );
  const [isAdding, setIsAdding] = useState<boolean>(false); // State for showing the add form
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: "",
    category: "",
    amount: 0,
    transaction_date: "",
    transaction_type: "Debit",
  });

  // Function to handle form submission for adding new transaction
  const handleAdd = () => {
    newTransaction.transaction_type = newTransaction.transaction_type
      ? newTransaction.transaction_type
      : "Debit";
    if (
      newTransaction.category &&
      newTransaction.amount &&
      newTransaction.transaction_date &&
      newTransaction.transaction_type
    ) {
      newTransaction.id = "transaction_" + (transactions.length + 1);
      handleAddTransaction(newTransaction); // Pass new transaction to parent handler
      setIsAdding(false); // Close form
      setNewTransaction({
        id: "",
        category: "",
        amount: 0,
        transaction_date: "",
        transaction_type: "",
      }); // Reset form
    }
  };

  const handleCancelAdd = () => {
    setIsAdding(false); // Close form without adding
    setNewTransaction({
      id: "",
      category: "",
      amount: 0,
      transaction_date: "",
      transaction_type: "",
    }); // Reset form
  };

  const handleEdit = (transaction: Transaction) => {
    setEditTransaction(transaction);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editTransaction) {
      handleUpdateTransaction(editTransaction.id, editTransaction);
      setIsEditing(false);
      setEditTransaction(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTransaction(null);
  };

  return (
    <Card className="bg-white">
      <CardHeader className="text-center text-lg font-semibold text-gray-500">
        Transaction Management
      </CardHeader>
      <CardContent>
        {/* Transaction Table */}
        <div className="overflow-x-auto max-w-full overflow-y-auto h-[400px]">
          <table className="min-w-full table-auto text-sm text-gray-800">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="px-4 py-2">Transaction ID</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Transaction Date</th>
                <th className="px-4 py-2">Transaction Type</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition-all duration-300"
                >
                  <td className="px-4 py-2">{transaction.id}</td>
                  <td className="px-4 py-2">
                    {isEditing && editTransaction?.id === transaction.id ? (
                      <select
                        value={editTransaction.category}
                        onChange={(e) =>
                          setEditTransaction({
                            ...editTransaction,
                            category: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md text-sm"
                      >
                        <option value="Debit">Debit</option>
                        <option value="Credit">Credit</option>
                        <option value="Food">Food</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Travel">Travel</option>
                        <option value="EMIs">EMIs</option>
                        <option value="Investment">Investment</option>
                        <option value="Income">Income</option>
                      </select>
                    ) : (
                      transaction.category
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {isEditing && editTransaction?.id === transaction.id ? (
                      <input
                        type="number"
                        value={editTransaction.amount}
                        onChange={(e) =>
                          setEditTransaction({
                            ...editTransaction,
                            amount: parseFloat(e.target.value),
                          })
                        }
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    ) : (
                      transaction.amount
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {isEditing && editTransaction?.id === transaction.id ? (
                      <input
                        type="date"
                        value={format(
                          new Date(editTransaction.transaction_date),
                          "yyyy-MM-dd"
                        )}
                        onChange={(e) =>
                          setEditTransaction({
                            ...editTransaction,
                            transaction_date: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    ) : (
                      format(
                        new Date(transaction.transaction_date),
                        "dd/MM/yyyy"
                      )
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {isEditing && editTransaction?.id === transaction.id ? (
                      <select
                        value={editTransaction.transaction_type}
                        onChange={(e) =>
                          setEditTransaction({
                            ...editTransaction,
                            transaction_type: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md text-sm"
                      >
                        <option value="Debit">Debit</option>
                        <option value="Credit">Credit</option>
                      </select>
                    ) : (
                      transaction.transaction_type
                    )}
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    {isEditing && editTransaction?.id === transaction.id ? (
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
                          onClick={() => handleEdit(transaction)}
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                        >
                          <FaEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteTransaction(transaction.id)
                          }
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
        <div className="mb-4 mt-8 text-center flex justify-between">
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              <FaPlus className="mr-2" /> Transaction
            </button>
          )}
          <button
            onClick={() => ganerateRandomTransactions()}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <FaPlus className="mr-2" /> Fetch Transactions From Banks
          </button>
        </div>

        {/* Form to add a new transaction */}
        {isAdding && (
          <div className="mb-4 p-4 border rounded-md">
            <h3 className="text-center text-lg font-semibold text-gray-500">
              Transaction
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-left block text-sm font-medium text-gray-500">
                  Transaction ID
                </label>
                <input
                  type="text"
                  value={"transaction_" + (transactions.length + 1)}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      id: "transaction_" + (transactions.length + 1),
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Transaction ID"
                />
              </div>
              <div>
                <label className="text-left block text-sm font-medium text-gray-500">
                  Category
                </label>
                <td className="px-4 py-2">
                  <select
                    value={newTransaction.category}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        category: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md text-sm"
                  >
                    <option value="Food">Food</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Travel">Travel</option>
                    <option value="EMIs">EMIs</option>
                    <option value="Investment">Investment</option>
                    <option value="Income">Income</option>
                  </select>
                </td>
              </div>
              <div>
                <label className="text-left block text-sm font-medium text-gray-500">
                  Amount
                </label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      amount: parseFloat(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Amount"
                />
              </div>
              <div>
                <label className="text-left block text-sm font-medium text-gray-500">
                  Transaction Date
                </label>
                <input
                  type="date"
                  value={newTransaction.transaction_date}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      transaction_date: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-left block text-sm font-medium text-gray-500">
                  Transaction Type
                </label>
                <select
                  value={newTransaction.transaction_type}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      transaction_type: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </select>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Add Transaction
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

export default TransactionTableCard;
