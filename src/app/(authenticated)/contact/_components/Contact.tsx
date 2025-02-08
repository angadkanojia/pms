"use client"
import { useState } from "react";
import TableContact from "./TableContact";
import { contacts as contactData } from "@/app/api/contact/route";

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event:any) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 shadow-md rounded-md py-7 px-4">
        <h1 className="text-3xl pl-3 font-bold">Contacts</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search Contact"
            value={searchTerm}
            onChange={handleSearch}
            className="text-gray-700 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Contact
          </button>
        </div>
      </div>

      <TableContact searchTerm={searchTerm} />
    </div>
  );
};

export default Contacts;
