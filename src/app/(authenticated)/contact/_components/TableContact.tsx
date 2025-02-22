"use client";

import React, { useMemo, useEffect, useCallback, useState } from "react";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Row } from "@tanstack/react-table";

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

interface ContactInput {
  searchTerm: string;
  setShowForm: (value: boolean) => void;
  setSelectedContact: React.Dispatch<React.SetStateAction<ContactProps | null>>;
}

const TableContact = ({
  searchTerm,
  setShowForm,
  setSelectedContact,
}: ContactInput) => {
  const [contacts, setContacts] = useState<ContactProps[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Fetch contacts from the database
  const fetchContacts = useCallback(async () => {
    try {
      const response = await axios.get("/api/contacts");
      // Replace the existing contacts with new ones
      setContacts(
        response.data.contacts.sort(
          (
            a: { createdAt: string | number | Date },
            b: { createdAt: string | number | Date },
          ) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Filter contacts based on search term
  const filteredContacts = useMemo(() => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, contacts]);

  // Handle delete action
  const handleDelete = useCallback(async (id: number) => {
    try {
      await axios.delete(`/api/contacts?id=${id}`);
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => Number(contact.id) !== id),
      );
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  }, []);

  // Open the form in edit mode
  const handleEdit = useCallback(
    (contact: ContactProps) => {
      setSelectedContact({
        ...contact,
        address: contact.address || "", // Provide default values if missing
        mobile_number: contact.mobile_number || "",
        company_name: contact.company_name || "",
        office_number: contact.office_number || undefined,
      });
      console.log(setSelectedContact);
      setShowForm(true);
    },
    [setSelectedContact, setShowForm],
  );

  // Define table columns
  const columns = useMemo(
    () => [
      {
        id: "select",
        header: () => <input type="checkbox" className="h-5 w-5 rounded-md" />,
        cell: () => <input type="checkbox" className="h-5 w-5" />,
      },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: Row<ContactProps> }) => (
          <div className="flex gap-4 md:gap-10">
            <button
              className="text-gray-600 hover:text-blue-500"
              onClick={() => handleEdit(row.original)}
            >
              <FaEdit size={16} />
            </button>
            <button
              className="text-gray-600 hover:text-red-500"
              onClick={() => handleDelete(Number(row.original.id))}
            >
              <FaTrash size={16} />
            </button>
          </div>
        ),
      },
    ],
    [handleDelete, handleEdit],
  );

  // Initialize table
  const table = useReactTable({
    data: filteredContacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: { pageIndex, pageSize },
    },
    onPaginationChange: (updater) => {
      setPageIndex(() => {
        const newState =
          typeof updater === "function"
            ? updater({ pageIndex, pageSize })
            : updater;
        setPageSize(newState.pageSize);
        return newState.pageIndex;
      });
    },
  });

  return (
    <div className="rounded-md bg-white px-4 py-6 shadow-md md:px-7 md:py-10">
      {/* Top Section: Records Per Page Selector */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageIndex(0);
            }}
            className="mr-2 rounded-md border px-4 py-2"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <label className="text-gray-700">Records per page</label>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full">
        <thead className="bg-blue-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  className="px-2 py-3 text-left text-sm md:px-4 md:text-base"
                >
                  {flexRender(
                    column.column.columnDef.header,
                    column.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white">
          {filteredContacts.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-2 py-2 text-sm md:px-4 md:py-3 md:text-base"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-3 text-center text-gray-500"
              >
                No contacts found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-300 py-4">
        <div className="mr-4 text-sm text-gray-600">
          <p>
            Showing {pageIndex * pageSize + 1} to{" "}
            {Math.min((pageIndex + 1) * pageSize, filteredContacts.length)} of{" "}
            {filteredContacts.length} entries
          </p>
        </div>

        <div className="flex items-center rounded-md border">
          <button
            className="border-r px-4 py-2 text-black hover:text-blue-600"
            onClick={() => setPageIndex(Math.max(pageIndex - 1, 0))}
            disabled={pageIndex === 0}
          >
            Previous
          </button>

          <div className="flex items-center">
            {Array.from(
              { length: table.getPageCount() },
              (_, index) => index,
            ).map((page, idx) => (
              <button
                key={page}
                onClick={() => setPageIndex(page)}
                className={`px-4 py-2 ${
                  page === pageIndex ? "bg-blue-500 text-white" : "bg-white"
                } hover:bg-blue-200 ${
                  idx !== table.getPageCount() - 1 && "border-r"
                }`}
              >
                {page + 1}
              </button>
            ))}
          </div>

          <button
            className="rounded-r-md px-4 py-2 text-black hover:text-blue-600"
            onClick={() =>
              setPageIndex(Math.min(pageIndex + 1, table.getPageCount() - 1))
            }
            disabled={pageIndex === table.getPageCount() - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableContact;
