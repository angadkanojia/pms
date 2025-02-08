import Image from "next/image";

import { dashboard } from "@/app/api/dashboard/route";

const DashboardCard = () => {
  return (
    <>
      <div className="shadow-xl rounded-md p-4  mt-3">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {dashboard.map((dashboards) => (
              <div
                key={dashboards.id}
                className="bg-white shadow-md rounded-lg  border flex flex-col justify-between"
              >
                <Image
                  src="/images/proposal_img.png"
                  alt="library image"
                  width={300}
                  height={500}
                  className="w-full h-auto rounded-t-lg"
                />
                <div className="border-b mb-2 px-5 pt-2 flex justify-between items-center">
                  <span className="font-semibold">{dashboards.title}</span>
                  
                </div>
               
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardCard;
