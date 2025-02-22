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
    null,
  );

  // Store the selected contact for editing

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="">
      {!showForm ? (
        <>
          <div className="mb-4 flex flex-col items-center justify-between rounded-md bg-white px-4 py-5 shadow-md sm:flex-row">
            <h1 className="font-inter text-[35px] font-bold">Contacts</h1>
            <div className="mt-3 flex w-full flex-col sm:mt-0 sm:w-auto sm:flex-row sm:space-x-4">
              <input
                type="text"
                placeholder="Search Contact"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:w-auto"
              />
              <button
                className="font-inter mt-2 w-full rounded-lg bg-primary px-4 py-2 text-xl font-semibold text-white sm:ml-2 sm:mt-0 sm:w-auto"
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
