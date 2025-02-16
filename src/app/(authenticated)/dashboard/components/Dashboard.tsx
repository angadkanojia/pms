"use client";
import React, { useState } from "react";
import DashboardCard from "./DashboardCard";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("View All"); // ✅ Default to "View All"

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 rounded-md bg-white px-10 py-5 shadow-md sm:flex-row sm:space-y-0">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex w-full flex-col items-center space-y-2 sm:w-auto sm:flex-row sm:space-x-4 sm:space-y-0">
          <input
            type="text"
            placeholder="Search for Document"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-64"
          />
          <button className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white hover:bg-blue-600 sm:w-auto">
            Create Template
          </button>
        </div>
      </div>

      <DashboardCard
        searchTerm={searchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
    
  );
}
