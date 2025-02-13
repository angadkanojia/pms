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
    <div className="shadow-xl rounded-md p-4 mt-3 bg-white">
      {/* Render the tab buttons */}
      <DashboardTab
        currentFilter={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredDashboard.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg border flex flex-col justify-between"
            >
              <Image
                src="/images/proposal_img.png"
                alt="library image"
                width={300}
                height={500}
                className="w-full h-auto rounded-t-lg"
              />
              <div className="mb-2 px-5 pt-2 flex justify-between items-center">
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
