import React from "react";

interface DashboardTabProps {
  currentFilter: string;
  setFilterStatus: (status: string) => void;
}
interface DashboardTabProps {
  currentFilter: string;
  setFilterStatus: (status: string) => void;
}

const DashboardTab: React.FC<DashboardTabProps> = ({
  currentFilter,
  setFilterStatus,
}) => {
  const filters = [
    { status: "View All", label: "View All" },
    { status: "Inprogress", label: "Inprogress" },
    { status: "Draft", label: "Draft(1)" },
    { status: "Expired", label: "Expired(1)" },
    { status: "Loss", label: "Loss(1)" },
    { status: "Cancelled", label: "Cancelled(1)" },
    { status: "Won", label: "Won(12)" },
  ];

  return (
    <div className="mb-5 border-b mt-2 pb-6">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4 mx-auto w-full">
        {filters.map(({ status, label }) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`p-2 text-lg transition duration-200 whitespace-nowrap rounded-xl border text-center ${
              currentFilter === status
                ? "text-primary border-primary bg-blue-100"
                : "bg-gray-200 text-gray-600 border-transparent hover:border-primary hover:text-blue-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardTab;
