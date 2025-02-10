"use client";
import React, { useState } from "react";
import DashboardCard from "./DashboardCard";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="bg-gray-200">
      <div className="p-5">
        <div className="bg-white flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 shadow-md rounded-md py-5 px-10">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search for Document"
              value={searchTerm}
              onChange={handleSearch}
              className="border p-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-primary text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-600 w-full sm:w-auto">
              Create Template
            </button>
          </div>
        </div>

        {/* Pass all required props to DashboardCard */}
        <DashboardCard
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      </div>
    </div>
  );
}
