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
    <div className="mb-5 mt-2 border-b pb-6">
      <div className="mx-auto grid w-full grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4">
        {filters.map(({ status, label }) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`whitespace-nowrap rounded-xl border p-2 text-center text-lg transition duration-200 ${
              currentFilter === status
                ? "border-primary bg-blue-100 text-primary"
                : "border-transparent bg-gray-200 text-gray-600 hover:border-primary hover:text-blue-600"
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
