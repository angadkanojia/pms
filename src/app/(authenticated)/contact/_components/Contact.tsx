"use client";
import { useState } from "react";
import TableContact from "./TableContact";
import ShowForm from "./ShowForm";

type ContactProps = {
  id: string;
  name: string;
  email: string;
  address: string;
  mobile_number: string;
  company_name: string;
  office_number?: string;
  createdAt: string;
};

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactProps | null>(
    null
  );

  // Store the selected contact for editing

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  console.log("angad-deepak");
  return (
    <div className="">
      {!showForm ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 shadow-md rounded-md py-5 px-4 bg-white">
            <h1 className="text-[35px] font-inter font-bold">Contacts</h1>
            <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto mt-3 sm:mt-0">
              <input
                type="text"
                placeholder="Search Contact"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:w-auto"
              />
              <button
                className="bg-primary text-xl font-semibold font-inter text-white px-4 py-2 rounded-lg mt-2 sm:mt-0 sm:ml-2 w-full sm:w-auto"
                onClick={() => {
                  setShowForm(true);
                  setSelectedContact(null); // Reset selected contact
                }}
              >
                + Add Contact
              </button>
            </div>
          </div>
          {/* Pass showForm and setShowForm to TableContact */}
          <TableContact
            searchTerm={searchTerm}
            setShowForm={setShowForm}
            setSelectedContact={setSelectedContact}
          />
        </>
      ) : (
        // Pass the selected contact for editing
        <ShowForm setShowForm={setShowForm} contact={selectedContact} />
      )}
    </div>
  );
};

export default Contacts;
