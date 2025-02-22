"use client";

import axios from "axios";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

interface TableSectionProps {
  sections: { id: number; title: string }[];
  fetchSections: () => void;
  handleEdit: (section: { id: number; title: string }) => void; // Add handleEdit to the props type
}

const TableSection: React.FC<TableSectionProps> = ({ sections, fetchSections, handleEdit }) => {
  // Show toast message when triggered
  const showToastMessage = (message: string) => {
    toast.success(message, {
      position: "top-right", // Position at the top right
    });
  };

  // Handle Delete Function
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this section?")) return;
  
    try {
      const response = await axios.post("/api/section-builder", { id, action: "delete" });
  
      if (response.status === 200) {
        showToastMessage("Section deleted successfully!");
        fetchSections(); // Refresh the list after deletion
      } else {
        toast.error(response.data.message || "Failed to delete section.");
      }
    } catch (error) {
      console.error("Error deleting section:", error);
      toast.error("An error occurred while deleting the section.");
    }
  };

  return (
    <div className="py-6 px-4 md:py-10 md:px-7 bg-white">
      <table className="min-w-full border-separate border-spacing-4">
        <tbody>
          {sections.map((item) => (
            <tr key={item.id} className="bg-gray-100 rounded-lg">
              <td className="py-3 px-4 rounded-full text-sm md:text-base flex justify-between items-center">
                <span>{item.title}</span>
                <div className="space-x-4">
                  <button className="text-gray-600 hover:text-blue-500" onClick={() => handleEdit(item)}>
                    <FaEdit />
                  </button>
                  <button className="text-gray-600 hover:text-red-500" onClick={() => handleDelete(item.id)}>
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default TableSection;
