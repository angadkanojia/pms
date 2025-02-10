import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaTrash, FaEdit } from "react-icons/fa";
import { contacts as contactData } from "@/app/api/contact/route";

const TableContact = ({ searchTerm }: { searchTerm: string }) => {
  const filteredContacts = contactData.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (filteredContacts.length === 0) {
    return (
      <div className="py-3 px-4 text-center text-gray-500">
        No contacts found
      </div>
    );
  }

  const columns: TableColumn<Contact>[] = [
    {
      name: "",
      selector: (row) => row.name,
      cell: () => <input type="checkbox" className="w-5 h-5 rounded-md" />,
      width: "60px",
      // omit: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="px-4 py-3 font-semibold text-gray-700">{row.name}</div>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      cell: (row) => <div className="px-4 py-3 text-gray-700">{row.email}</div>,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-3 sm:gap-4 px-2 sm:px-4 py-3">
          <button className="text-gray-600 hover:text-red-500">
            <FaTrash size={16} />
          </button>
          <button className="text-gray-600 hover:text-blue-500">
            <FaEdit size={16} />
          </button>
        </div>
      ),
      width: "120px",
    },
  ];
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#EFF6FF",
        borderRadius: "0",
      },
    },
    headCells: {
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        color: "#374151",
      },
    },
  };
  return (
    <div className="shadow-md rounded-lg overflow-hidden bg-white">
      <DataTable
        columns={columns}
        data={filteredContacts}
        customStyles={customStyles}
        noDataComponent={
          <div className="py-3 px-4 text-center text-gray-500">
            No contacts found
          </div>
        }
        pagination
        highlightOnHover
        responsive
        className="w-full"
      />
    </div>
  );
};

export default TableContact;
