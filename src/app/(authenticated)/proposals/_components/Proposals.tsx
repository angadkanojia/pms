"use client";
import { useState } from "react";
import ProposalCard from "./ProposalCard";
import ProposalSectionForm from "./ProposalSectionForm ";

const Proposals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreatingProposal, setIsCreatingProposal] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCreateProposalClick = () => {
    setIsCreatingProposal(true);
  };

  const handleCancelProposal = () => {
    setIsCreatingProposal(false);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      {isCreatingProposal ? (
        <ProposalSectionForm handleCancel={handleCancelProposal} />
      ) : (
        <>
          <div className="mb-4 flex flex-col items-center justify-between rounded-md bg-white px-4 py-5 shadow-md sm:flex-row">
            <h1 className="text-2xl font-bold">Proposals</h1>
            <div className="flex w-full flex-col items-center space-y-2 sm:w-auto sm:flex-row sm:space-x-4 sm:space-y-0">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search for Document"
                className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-64"
              />
              <button
                className="w-full rounded-md bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 sm:w-auto"
                onClick={handleCreateProposalClick}
              >
                Create Proposal
              </button>
            </div>
          </div>
          <ProposalCard searchTerm={searchTerm} />
        </>
      )}
    </div>
  );
};

export default Proposals;
