import Image from "next/image";
import DashboardTab from "./DashboardTab";

interface DashboardCardProps {
  searchTerm: string;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

const dashboardData = [
  { id: 1, title: "Client1", status: "Inprogress" },
  { id: 2, title: "Client 2", status: "Draft" },
  { id: 3, title: "Client 3", status: "Expired" },
  { id: 4, title: "Client 4", status: "Loss" },
  { id: 5, title: "Client 5", status: "Cancelled" },
  { id: 6, title: "Client6", status: "Cancelled" },
  { id: 7, title: "Client7", status: "Inprogress" },
  { id: 8, title: "Client8", status: "Expired" },
  { id: 9, title: "Client9", status: "Cancelled" },
  { id: 10, title: "Client10", status: "Won" },
];

const DashboardCard: React.FC<DashboardCardProps> = ({
  searchTerm,
  filterStatus,
  setFilterStatus,
}) => {
  // ✅ Corrected filtering logic
  const filteredDashboard = dashboardData.filter((item) => {
    const titleMatch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // ✅ Show all data when "View All" is selected
    const statusMatch =
      filterStatus === "View All" ||
      item.status.toLowerCase() === filterStatus.toLowerCase();

    return titleMatch && statusMatch;
  });

  return (
    <div className="mt-3 rounded-md bg-white p-4 shadow-xl">
      {/* Render the tab buttons */}
      <DashboardTab
        currentFilter={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredDashboard.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-lg border bg-white shadow-md"
            >
              <Image
                src="/images/proposal_img.png"
                alt="library image"
                width={300}
                height={500}
                className="h-auto w-full rounded-t-lg"
              />
              <div className="mb-2 flex items-center justify-between px-5 pt-2">
                <span className="font-semibold">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
