import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaTrash, FaEdit } from "react-icons/fa";

interface ContactInput {
  searchTerm: string;
}

const contactData = [
  {
    name: "Ricky Pointing",
    email: "rickypointing@gmail.com",
  },
  {
    name: "Kim Girocking",
    email: "kimgirocking@yahoo.in",
  },
  {
    name: "Jackson Balabala",
    email: "jacksonbalabala@icloud.com",
  },
  {
    name: "Claudia Emmay",
    email: "claudiaemmay@outlook.com",
  },
];

interface ContactInput{
  searchTerm: string
}


const TableContact = ({ searchTerm }: ContactInput) => {
  // Global Search Filter
  const filteredContacts = useMemo(
    () =>
      contactData.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm],
  );

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: () => <input type="checkbox" className="h-5 w-5 rounded-md" />,
        cell: () => <input type="checkbox" className="h-5 w-5" />,
      },
      { accessorKey: "name", header: () => "Name" },
      { accessorKey: "email", header: () => "Email" },
      {
        id: "actions",
        header: () => "Actions",
        cell: () => (
          <div className="flex gap-4 md:gap-10">
            <button className="text-gray-600 hover:text-red-500">
              <FaTrash size={16} />
            </button>
            <button className="text-gray-600 hover:text-blue-500">
              <FaEdit size={16} />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredContacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md bg-white px-4 py-6 shadow-md md:px-7 md:py-10">
      <div className="">
        <table className="min-w-full">
          <thead className="bg-blue-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    key={column.id}
                    className={`px-2 py-3 text-left text-sm md:px-4 md:text-base ${
                      index === 0 ? "rounded-bl-lg rounded-tl-lg" : ""
                    } ${
                      index === headerGroup.headers.length - 1
                        ? "rounded-br-lg rounded-tr-md"
                        : ""
                    }`}
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
              table.getRowModel().rows.map((row, rowIndex) => (
                <tr key={row.id} className="border-b hover:bg-gray-50">
                  {row.getVisibleCells().map((cell, index) => (
                    <td
                      key={cell.id}
                      className={`px-2 py-2 text-sm md:px-4 md:py-3 md:text-base ${
                        rowIndex === table.getRowModel().rows.length - 1
                          ? index === 0
                            ? "rounded-bl-md"
                            : index === row.getVisibleCells().length - 1
                              ? "rounded-br-md"
                              : ""
                          : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="rounded-b-md px-4 py-3 text-center text-gray-500"
                >
                  No contacts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableContact;
