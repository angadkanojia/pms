import Image from "next/image";
import { dashboard as dashboardData } from "@/app/api/dashboard/route";
import DashboardTab from "./DashboardTab";
const DashboardCard: React.FC<DashboardCardProps> = ({ searchTerm, filterStatus, setFilterStatus }) => {
  // Filter dashboard data based on the search term and the status filter.
  const filteredDashboard = dashboardData.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = filterStatus ? item.status.toLowerCase() === filterStatus.toLowerCase() : true;
    return titleMatch && statusMatch;
  });

  return (
    <div className="shadow-xl rounded-md p-4 mt-3 bg-white">
      {/* Render the tab buttons */}
      <DashboardTab currentFilter={filterStatus} setFilterStatus={setFilterStatus} />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredDashboard.map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg border flex flex-col justify-between">
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
