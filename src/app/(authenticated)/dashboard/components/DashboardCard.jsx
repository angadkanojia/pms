
import Image from "next/image";
import { dashboard as dashboardData } from "@/app/api/dashboard/route";

const DashboardCard = ({ searchTerm }) => {
  // Filter dashboard data based on the search term
  const filteredDashboard = dashboardData.filter((dashboards) =>
    dashboards.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="shadow-xl rounded-md p-4 mt-3 bg-white p-5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredDashboard.map((dashboards, index) => (
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
              <div className=" mb-2 px-5 pt-2 flex justify-between items-center">
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
