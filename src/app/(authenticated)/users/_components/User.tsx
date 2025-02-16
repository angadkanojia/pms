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
    <div className="bg-gray-200 p-4">
      {!showUser ? (
        <>
          <div className="mb-4 flex flex-col items-center justify-between rounded-md bg-white px-4 py-5 shadow-md sm:flex-row">
            <h1 className="text-2xl font-bold sm:text-3xl">Users</h1>
            <div className="mt-3 flex w-full flex-col sm:mt-0 sm:w-auto sm:flex-row sm:space-x-4">
              <input
                type="text"
                placeholder="Search Contact"
                value={searchUser}
                onChange={handleSearch}
                className="w-full rounded border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:w-auto"
              />
              <button
                className="mt-2 w-full rounded bg-blue-500 px-4 py-2 text-white sm:ml-2 sm:mt-0 sm:w-auto"
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
