import ProposalCard from "./ProposalCard";

const Proposals = () => {
  return (
    <div className="p-5">
    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 shadow-md rounded-md py-5 px-10 ">
      <h1 className="text-2xl font-bold">Proposals</h1>
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search for Document"
          className="border p-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 w-full sm:w-auto">
          Create Proposal
        </button>
      </div>
    </div>
      <ProposalCard />
    </div>
  );
};

export default Proposals;
