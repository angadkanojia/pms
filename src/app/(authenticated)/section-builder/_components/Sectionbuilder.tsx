"use client";
import { useState } from "react";
import TableSection from "./TableSection";
import Modal from "./Model";

const Sectionbuilder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gray-200 p-4">
      {/* Header Section */}
      <div className="mb-4 flex flex-col items-center justify-between rounded-md bg-white px-4 py-5 shadow-md sm:flex-row">
        <h1 className="text-2xl font-bold sm:text-3xl">Section Builder</h1>
        <div className="mt-3 flex w-full flex-col sm:mt-0 sm:w-auto sm:flex-row sm:space-x-4">
          <button
            className="mt-2 w-full rounded bg-blue-500 px-4 py-2 text-white sm:ml-2 sm:mt-0 sm:w-auto"
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
