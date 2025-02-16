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
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-center text-xl font-bold">Add New Section</h2>
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
          className="mt-4 w-full rounded border border-gray-300 p-2"
        />
        <button
          className="mt-4 w-full rounded bg-blue-500 px-2 py-2 text-center text-white"
          onClick={onClose} // Close modal after saving
        >
          Save Section
        </button>
      </div>
    </div>
  );
};

export default Modal;
