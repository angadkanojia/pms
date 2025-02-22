import React, { useMemo, useEffect, useState, JSX } from "react";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaTrash, FaEdit } from "react-icons/fa";

interface User {
  id: string;
  name: string;
  email: string;
  status: boolean;
}

interface UserProps {
  searchUser: string;
}

const UsersTable = ({ searchUser }: UserProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch Users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data.users);
      } catch {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // ✅ Global Search Filter
  const filteredContacts = useMemo(
    () =>
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
          user.email.toLowerCase().includes(searchUser.toLowerCase()),
      ),
    [searchUser, users],
  );

  // ✅ Handle Single Checkbox Selection
  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ✅ Handle "Select All" Checkbox
  const handleSelectAll = () => {
    const isAllSelected = filteredContacts.every(
      (user) => selectedRows[user.id],
    );

    // If all selected, deselect all; otherwise, select all
    const newSelections = filteredContacts.reduce(
      (acc, user) => ({ ...acc, [user.id]: !isAllSelected }),
      {} as Record<string, boolean>,
    );
    setSelectedRows(newSelections);
  };

  // ✅ Check if all rows are selected
  const isAllChecked =
    filteredContacts.length > 0 &&
    filteredContacts.every((user) => selectedRows[user.id]);

  // ✅ Table Columns
  const columns = useMemo(
    () => [
      {
        id: "select",
        header: (): JSX.Element => (
          <input
            type="checkbox"
            className="h-5 w-5 rounded-md"
            onChange={handleSelectAll}
            checked={isAllChecked}
          />
        ),
        cell: ({ row }: { row: { original: User } }) => (
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={!!selectedRows[row.original.id]}
            onChange={() => handleSelectRow(row.original.id)}
          />
        ),
      },
      {
        accessorKey: "name",
        header: (): string => "Name",
      },
      {
        accessorKey: "email",
        header: (): string => "Email",
      },
      {
        accessorKey: "status",
        header: (): string => "Status",
        cell: ({ row }: { row: { original: User } }) => {
          const status = row.original.status ? "Active" : "Inactive";
          return (
            <span
              className={`rounded-md px-2 py-1 text-xs font-semibold ${
                row.original.status ? "text-green-700" : "text-red-700"
              }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: (): string => "Actions",
        cell: (): JSX.Element => (
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
    [selectedRows, filteredContacts],
  );

  const table = useReactTable({
    data: filteredContacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md bg-white px-4 py-6 shadow-md md:px-7 md:py-10">
      {loading ? (
        <p className="text-center text-gray-600">Loading users...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div>
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
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
