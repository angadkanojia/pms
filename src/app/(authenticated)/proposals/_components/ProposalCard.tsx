import Image from "next/image";
import CardComponent from "./CardShadow";
import { proposals } from "@/app/api/proposals/route";

const ProposalCard = ({searchTerm}:ProposalCardProps) => {
  // Search Filter
  const filterProposal = proposals.filter((proposal) => 
  proposal.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <>
      <div className="shadow-xl rounded-md p-4 bg-white mt-3">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filterProposal.map((proposal) => (
              <div
                key={proposal.id}
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
                  <span className="font-semibold">{proposal.title}</span>
                  <CardComponent />
                </div>
                <div
                  className={`${proposal.color} py-1 text-center font-medium text-base`}
                >
                  {proposal.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProposalCard;
