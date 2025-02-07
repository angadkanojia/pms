import Image from "next/image";
import CardComponent from "./CardShadow";

interface LibraryCard {
  id: number;
  title: string;
  status: string;
  color: string;
}
const libraryCards = [
  { id: 1, title: "Template 1" },
  { id: 2, title: "Template 2" },
  { id: 3, title: "Template 3" },
  { id: 4, title: "Template 4" },
  { id: 5, title: "Template 5" },
  { id: 6, title: "Template 6" },
  { id: 7, title: "Template 7" },
  { id: 8, title: "Template 8" },
  { id: 9, title: "Template 9" },
  { id: 10 ,title: "Template 10" },
];

const LibraryCard = () => {
  return (
    <>
      <div className="shadow-xl rounded-md p-4  mt-3">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {libraryCards.map((library) => (
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
