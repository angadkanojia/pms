"use client";
import React, { useState } from "react";
import UsersTable from "./UsersTable";
import ShowUser from "./ShowUser";

const User = () => {
  const [searchUser, setsearchUser] = useState("");
  const [showUser, setShowUser] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsearchUser(event.target.value);
  };
  return (
    <div className="p-4 bg-gray-200">
      {!showUser ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 shadow-md rounded-md py-5 px-4 bg-white">
            <h1 className="text-2xl sm:text-3xl font-bold">Users</h1>
            <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto mt-3 sm:mt-0">
              <input
                type="text"
                placeholder="Search Contact"
                value={searchUser}
                onChange={handleSearch}
                className="text-gray-700 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full sm:w-auto"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 sm:mt-0 sm:ml-2 w-full sm:w-auto"
                onClick={() => setShowUser(true)}
              >
                + Add Users
              </button>
            </div>
          </div>
          <UsersTable searchUser={searchUser} />{" "}
        </>
      ) : (
        <ShowUser setShowUser={setShowUser} showUser={showUser} />
      )}
    </div>
  );
};

export default User;
