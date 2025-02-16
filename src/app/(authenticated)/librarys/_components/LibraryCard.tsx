import Image from "next/image";
import CardComponent from "./CardShadow";

interface LibraryInput {
  searchTerm: string;
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
  { id: 10, title: "Template 10" },
];

const LibraryCard = ({ searchTerm }: LibraryInput) => {
  // Search Filter
  const filterTitle = libraryCards.filter((title) =>
    title.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <>
      <div className="mt-3 rounded-md bg-white p-4 shadow-xl">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filterTitle.map((library) => (
              <div
                key={library.id}
                className="flex flex-col justify-between rounded-lg border bg-white shadow-md"
              >
                <Image
                  src="/images/proposal_img.png"
                  alt="library image"
                  width={300}
                  height={500}
                  className="h-auto w-full rounded-t-lg"
                />
                <div className="flex items-center justify-between px-5 pt-2">
                  <span className="mb-1 font-semibold">{library.title}</span>
                  <CardComponent />
                </div>
                <div className="mb-2 ml-5">Created Date 01/05/2024</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default LibraryCard;
