"use client"
import { useState } from "react";
import LibraryCard from "./LibraryCard";

const Library = () => {
  const [searchTerm , setSearchTerm] = useState("");
  const handleSearch = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setSearchTerm(event.target.value);
  }
  return (
    <div className="p-6 bg-gray-200">
    <div className="bg-white flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 shadow-md rounded-md py-5 px-10 ">
      <h1 className="text-2xl font-bold">Library</h1>
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for Document"
          className="border p-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 w-full sm:w-auto">
          Create Proposal
        </button>
      </div>
    </div>
      <LibraryCard searchTerm={searchTerm}/>
    </div>
  );
};

export default Library;
