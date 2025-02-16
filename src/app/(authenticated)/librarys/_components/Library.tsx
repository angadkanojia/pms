"use client";
import { useState } from "react";
import LibraryCard from "./LibraryCard";

const Library = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className="bg-gray-200 p-6">
      <div className="flex flex-col items-center justify-between space-y-4 rounded-md bg-white px-10 py-5 shadow-md sm:flex-row sm:space-y-0">
        <h1 className="text-2xl font-bold">Library</h1>
        <div className="flex w-full flex-col items-center space-y-2 sm:w-auto sm:flex-row sm:space-x-4 sm:space-y-0">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for Document"
            className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-64"
          />
          <button className="w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 sm:w-auto">
            Create Proposal
          </button>
        </div>
      </div>
      <LibraryCard searchTerm={searchTerm} />
    </div>
  );
};

export default Library;
