import Image from "next/image";
import CardComponent from "./CardShadow";
import { libraryCards } from "@/app/api/librarys/route";



const LibraryCard = ({searchTerm}:LibraryInput) => {
  // Search Filter
  const filterTitle = libraryCards.filter((title)=>
  title.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <>
      <div className="bg-white shadow-xl rounded-md p-4  mt-3">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filterTitle.map((library) => (
              <div
                key={library.id}
                className="bg-white shadow-md rounded-lg  border flex flex-col justify-between"
              >
                <Image
                  src="/images/proposal_img.png"
                  alt="library image"
                  width={300}
                  height={500}
                  className="w-full h-auto rounded-t-lg"
                />
                <div className="pt-2 flex justify-between items-center px-5">
                  <span className="font-semibold mb-1">{library.title}</span>
                  <CardComponent />
                </div>
                <div className="ml-5 mb-2">Created Date 01/05/2024</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default LibraryCard;
