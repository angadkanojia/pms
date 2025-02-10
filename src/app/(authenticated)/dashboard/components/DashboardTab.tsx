import React from "react";
const DashboardTab: React.FC<DashboardTabProps> = ({ currentFilter, setFilterStatus }) => {
  return (
    <div className="mb-5 border-b mt-2">
      <div className="flex gap-4 mx-auto mb-5 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 shadow-md rounded-md py-5 px-10">
        <button
          onClick={() => setFilterStatus("Inprogress")}
          className={`flex items-center justify-center p-2 text-1xl transition duration-200 w-36 rounded-lg border border-transparent bg-gray-200 hover:border-blue-600 hover:text-blue-600 ${
            currentFilter === "Inprogress" ? "bg-blue-300 text-blue-600" : "text-gray-400"
          }`}
        >
          Inprogress
        </button>
        <button
          onClick={() => setFilterStatus("Draft")}
          className={`flex items-center justify-center p-2 text-1xl transition duration-200 w-40 rounded-lg border border-transparent bg-gray-200 hover:border-blue-600 hover:text-blue-600 ${
            currentFilter === "Draft" ? "bg-blue-300 text-blue-600" : "text-gray-400"
          }`}
        >
          Draft(1)
        </button>
        <button
          onClick={() => setFilterStatus("Expired")}
          className={`flex items-center justify-center p-2 text-1xl transition duration-200 w-36 rounded-lg border border-transparent bg-gray-200 hover:border-blue-600 hover:text-blue-600 ${
            currentFilter === "Expired" ? "bg-blue-300 text-blue-600" : "text-gray-400"
          }`}
        >
          Expired(1)
        </button>
        <button
          onClick={() => setFilterStatus("Loss")}
          className={`flex items-center justify-center p-2 text-1xl transition duration-200 w-40 rounded-lg border border-transparent bg-gray-200 hover:border-blue-600 hover:text-blue-600 ${
            currentFilter === "Loss" ? "bg-blue-300 text-blue-600" : "text-gray-500"
          }`}
        >
          Loss(1)
        </button>
        <button
          onClick={() => setFilterStatus("Cancelled")}
          className={`flex items-center justify-center p-2 text-1xl transition duration-200 w-40 rounded-lg border border-transparent bg-gray-200 hover:border-blue-600 hover:text-blue-600 ${
            currentFilter === "Cancelled" ? "bg-blue-300 text-blue-600" : "text-gray-400"
          }`}
        >
          Cancelled(1)
        </button>
        <button
          onClick={() => setFilterStatus("Won")}
          className={`flex items-center justify-center p-2 text-1xl transition duration-200 w-40 rounded-lg border border-transparent bg-gray-200 hover:border-blue-600 hover:text-blue-600 ${
            currentFilter === "Won" ? "bg-blue-300 text-blue-600" : "text-gray-400"
          }`}
        >
          Won(12)
        </button>
      </div>
    </div>
  );
};

export default DashboardTab;
