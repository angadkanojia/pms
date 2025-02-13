"use client";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render modal if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-center">Add New Section</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✖
          </button>
        </div>
        <input
          type="text"
          placeholder="Enter section name"
          className="w-full p-2 border border-gray-300 rounded mt-4"
        />
        <button
          className="bg-blue-500 text-white px-2 text-center py-2 rounded w-full mt-4"
          onClick={onClose} // Close modal after saving
        >
          Save Section
        </button>
      </div>
    </div>
  );
};

export default Modal;
