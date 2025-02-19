import Image from "next/image";
import { dashboard as dashboardData } from "@/app/api/dashboard/route";

const DashboardCard = ({ searchTerm }) => {
  // Filter dashboard data based on the search term
  const filteredDashboard = dashboardData.filter((dashboards) =>
    dashboards.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="mt-3 rounded-md bg-white p-4 p-5 shadow-xl">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredDashboard.map((dashboards, index) => (
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
                <span className="font-semibold">{dashboards.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
