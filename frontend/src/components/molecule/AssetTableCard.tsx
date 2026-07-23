import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card"; // ShadCN Card components
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa"; // Trash, Edit, and Plus icons
import { Asset } from "./AssetTableCard"; // Assuming Asset type is imported from AssetCard

const AssetTableCard = ({
  assets = [],
  handleDeleteAsset,
  handleUpdateAsset,
  handleAddAsset, // This function will handle adding new assets
}: {
  assets: Asset[];
  handleDeleteAsset: (id: number) => void;
  handleUpdateAsset: (id: number, updatedAsset: Asset) => void;
  handleAddAsset: (newAsset: any) => void; // Accept a new asset to be added
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editAsset, setEditAsset] = useState<Asset | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false); // State for showing the add form
  const [newAsset, setNewAsset] = useState<Asset>({
    id: 0,
    type: "",
    value: 0,
  });

  // Function to handle form submission for adding new asset
  const handleAdd = () => {
    if (newAsset.type && newAsset.value) {
      newAsset.id = "assets" + Number(assets.length + 1);
      handleAddAsset(newAsset); // Pass new asset to parent handler
      setIsAdding(false); // Close form
      setNewAsset({ id: 0, type: "", value: 0 }); // Reset form
    }
  };

  const handleCancelAdd = () => {
    setIsAdding(false); // Close form without adding
    setNewAsset({ id: 0, type: "", value: 0 }); // Reset form
  };

  const handleEdit = (asset: Asset) => {
    setEditAsset(asset);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editAsset) {
      handleUpdateAsset(editAsset.id, editAsset);
      setIsEditing(false);
      setEditAsset(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditAsset(null);
  };

  return (
    <Card className="bg-white">
      <CardHeader className="text-center text-lg font-semibold text-gray-500">
        Asset Management
      </CardHeader>
      <CardContent>
        {/* Button to toggle  asset form */}

        {/* Asset Table */}
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-full table-auto text-sm text-gray-800">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="px-4 py-2">Asset ID</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Value</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition-all duration-300"
                >
                  <td className="px-4 py-2">{asset.id}</td>
                  <td className="px-4 py-2">
                    {isEditing && editAsset?.id === asset.id ? (
                      <input
                        type="text"
                        value={editAsset.type}
                        onChange={(e) =>
                          setEditAsset({ ...editAsset, type: e.target.value })
                        }
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    ) : (
                      asset.type
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {isEditing && editAsset?.id === asset.id ? (
                      <input
                        type="number"
                        value={editAsset.value}
                        onChange={(e) =>
                          setEditAsset({
                            ...editAsset,
                            value: parseFloat(e.target.value),
                          })
                        }
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    ) : (
                      asset.value
                    )}
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    {isEditing && editAsset?.id === asset.id ? (
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
                          onClick={() => handleEdit(asset)}
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                        >
                          <FaEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteAsset(asset.id)}
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
              <FaPlus className="mr-2" />  Asset
            </button>
          )}
        </div>

        {/* Form to add a new asset */}
        {isAdding && (
          <div className="mb-4 p-4 border rounded-md">
            <h3 className="text-center text-lg font-semibold text-gray-500">
               Asset
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-left block text-sm font-medium text-gray-500">
                  Asset ID
                </label>
                <input
                  type="text"
                  value={"asset_" + Number(assets.length + 1)}
                  onChange={(e) =>
                    setNewAsset({ ...newAsset, id: Number(assets.length + 1) })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Asset ID"
                />
              </div>
              <div>
                <label className="text-left block text-sm font-medium text-gray-500">
                  Type
                </label>
                <input
                  type="text"
                  value={newAsset.type}
                  onChange={(e) =>
                    setNewAsset({ ...newAsset, type: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Asset Type"
                />
              </div>
              <div>
                <label className="block text-left text-sm font-medium text-gray-500">
                  Value
                </label>
                <input
                  type="number"
                  value={newAsset.value}
                  onChange={(e) =>
                    setNewAsset({
                      ...newAsset,
                      value: parseFloat(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter Asset Value"
                />
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Add Asset
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

export default AssetTableCard;
