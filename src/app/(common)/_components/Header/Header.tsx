"use client";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { MdNotifications, MdMenu } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest("#user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <header className="w-full bg-white border-b flex items-center justify-between px-6 py-6">
      <button
        onClick={toggleSidebar}
        className="text-2xl bg-primary hover:bg-blue-600 text-white px-3 py-2 rounded"
      >
        <MdMenu />
      </button>

      <div className="flex items-center space-x-4">
        <MdNotifications className="text-3xl text-gray-700 cursor-pointer hover:text-gray-900" />

        <div className="bg-gray-300 w-[1px] h-10" />

        {session?.user && (
          <div className="relative">
            <div
              className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaUserCircle className="text-4xl text-blue-600" />
            </div>

            {isDropdownOpen && (
              <div
                id="user-dropdown"
                className="absolute right-0 mt-2 text-center bg-white border rounded-lg shadow-lg p-4 w-48"
              >
                <p className="font-medium">{session.user.name || "User"}</p>
                <p className="text-gray-500 text-xs">{session.user.email}</p>
                <Link
                  href="/dashboard"
                  className="block w-full text-center mt-3 hover:bg-primary hover:text-white text-primary px-2 py-2 rounded"
                >
                  Go to Dashboard
                </Link>
                <p
                  onClick={() => signOut()}
                  className="block w-full text-center hover:bg-primary hover:text-white text-red-500 cursor-pointer px-4 py-2 rounded"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
