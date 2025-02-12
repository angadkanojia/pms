import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaTrash, FaEdit } from "react-icons/fa";
import { users as usersData } from "@/app/api/users/route";

interface UserProps{
  searchUser: string;
}

const UsersTable = ({ searchUser }: UserProps) => {
  // Global Search Filter
  const filteredContacts = useMemo(
    () =>
      usersData.filter(
        (user) =>
          user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
          user.email.toLowerCase().includes(searchUser.toLowerCase())
      ),
    [searchUser]
  );

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: () => <input type="checkbox" className="w-5 h-5 rounded-md" />,
        cell: () => <input type="checkbox" className="w-5 h-5" />,
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
    []
  );

  const table = useReactTable({
    data: filteredContacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="shadow-md rounded-md py-6 px-4 md:py-10 md:px-7 bg-white ">
      <div className="">
        <table className="min-w-full ">
          <thead className="bg-blue-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    key={column.id}
                    className={`py-3 px-2 md:px-4 text-left text-sm md:text-base ${
                      index === 0 ? "rounded-tl-lg rounded-bl-lg" : ""
                    } ${
                      index === headerGroup.headers.length - 1
                        ? "rounded-tr-md rounded-br-lg"
                        : ""
                    }`}
                  >
                    {flexRender(
                      column.column.columnDef.header,
                      column.getContext()
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
                      className={`py-2 px-2 md:py-3 md:px-4 text-sm md:text-base ${
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
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-3 px-4 text-center text-gray-500 rounded-b-md"
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

export default UsersTable;
