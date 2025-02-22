"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  section?: { id: number; title: string } | null; 
  refreshData: () => void;
  action: "add" | "edit"; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, section, refreshData, action }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  // Show toast message when triggered
  const showToastMessage = (message: string) => {
    toast.success(message, {
      position: "top-right", // Position at the top right
    });
  };

  useEffect(() => {
    if (action === "edit" && section) {
      setTitle(section.title);
    }
  }, [action, section]);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }
  
    setLoading(true);
  
    try {
      const requestData = action === "edit" && section ? 
        { id: section.id, title, action: "edit" } : 
        { title, action: "add" };
  
      const response = await axios.post("/api/section-builder", requestData);
  
      if (response.status === 201 || response.status === 200) {
        showToastMessage(`Section ${action === "edit" ? "updated" : "added"} successfully!`);
      }
  
      setTitle(""); // Reset the title input
      onClose(); // Close the modal
      refreshData(); // Refresh the table
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save section.");
    } finally {
      setLoading(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{action === "add" ? "Add New Section" : "Edit Section"}</h2>
          <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
            ✖
          </button>
        </div>
        <input
          type="text"
          placeholder="Enter section name"
          className="w-full p-2 border border-gray-300 rounded mt-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded w-full mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : action === "add" ? "Save Section" : "Update Section"}
        </button>
      </div>
    </div>
  );
};

export default Modal;
