"use client";
import { useState } from "react";
import TableSection from "./TableSection";
import Modal from "./Model";

const Sectionbuilder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 bg-gray-200">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 shadow-md rounded-md py-5 px-4 bg-white">
        <h1 className="text-2xl sm:text-3xl font-bold">Section Builder</h1>
        <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto mt-3 sm:mt-0">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 sm:mt-0 sm:ml-2 w-full sm:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Section Builder
          </button>
        </div>

      </div>

      {/* Table Section */}
      <TableSection />

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Sectionbuilder;
