import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const sectionbuilder = [
  { id: 1, title: "Cover Letter" },
  { id: 2, title: "Introduction" },
  { id: 3, title: "Objective" },
  { id: 4, title: "Description" },
];

const TableSection: React.FC = () => {
  return (
    <div className="rounded-md bg-white px-4 py-6 shadow-md md:px-7 md:py-10">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold md:text-base">
              Title
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold md:text-base">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {sectionbuilder.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-sm md:text-base">{item.title}</td>
              <td className="flex justify-center space-x-4 px-4 py-3">
                <button className="text-gray-600 hover:text-red-500">
                  <FaTrash />
                </button>
                <button className="text-gray-600 hover:text-red-500">
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSection;
