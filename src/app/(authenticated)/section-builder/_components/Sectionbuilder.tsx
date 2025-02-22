"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "./Model"; // Use the reusable Modal component
import TableSection from "./TableSection";

const SectionBuilder: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sections, setSections] = useState<{ id: number; title: string }[]>([]);
  const [selectedSection, setSelectedSection] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [modalAction, setModalAction] = useState<"add" | "edit">("add"); // Tracks whether we're adding or editing a section

  const fetchSections = async () => {
    try {
      const response = await axios.get("/api/section-builder");
      setSections(response.data.sections);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleEdit = (section: { id: number; title: string }) => {
    setSelectedSection(section);
    setModalAction("edit");
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setModalAction("add");
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-200">
      <div className="mb-4 flex flex-col items-center justify-between rounded-md bg-white px-4 py-5 shadow-md sm:flex-row">
        <h1 className="text-2xl font-bold">Section Builder</h1>
        <button
          className="mt-2 rounded bg-blue-500 px-4 py-2 text-white sm:mt-0"
          onClick={handleAdd}
        >
          + Add Section
        </button>
      </div>

      {/* Table Section */}
      <TableSection
        sections={sections}
        fetchSections={fetchSections}
        handleEdit={handleEdit}
      />

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        section={selectedSection}
        refreshData={fetchSections}
        action={modalAction} // Pass action for add or edit
      />
    </div>
  );
};

export default SectionBuilder;
