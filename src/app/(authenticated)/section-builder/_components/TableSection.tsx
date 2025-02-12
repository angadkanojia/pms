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
    <div className="shadow-md rounded-md py-6 px-4 md:py-10 md:px-7 bg-white">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-blue-100">
          <tr>
            <th className="py-3 px-4 text-left text-sm md:text-base font-semibold">
              Title
            </th>
            <th className="py-3 px-4 text-center text-sm md:text-base font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {sectionbuilder.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 text-sm md:text-base">{item.title}</td>
              <td className="py-3 px-4 flex justify-center space-x-4">
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
