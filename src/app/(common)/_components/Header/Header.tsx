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
    <header className="flex w-full items-center justify-between border-b bg-white px-6 py-6">
      <button
        onClick={toggleSidebar}
        className="rounded bg-primary px-3 py-2 text-2xl text-white hover:bg-blue-600"
      >
        <MdMenu />
      </button>

      <div className="flex items-center space-x-4">
        <MdNotifications className="cursor-pointer text-3xl text-gray-700 hover:text-gray-900" />

        <div className="h-10 w-[1px] bg-gray-300" />

        {session?.user && (
          <div className="relative">
            <div
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-100 text-blue-600"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaUserCircle className="text-4xl text-blue-600" />
            </div>

            {isDropdownOpen && (
              <div
                id="user-dropdown"
                className="absolute right-0 mt-2 w-48 rounded-lg border bg-white p-4 text-center shadow-lg"
              >
                <p className="font-medium">{session.user.name || "User"}</p>
                <p className="text-xs text-gray-500">{session.user.email}</p>
                <Link
                  href="/dashboard"
                  className="mt-3 block w-full rounded px-2 py-2 text-center text-primary hover:bg-primary hover:text-white"
                >
                  Go to Dashboard
                </Link>
                <p
                  onClick={() => signOut()}
                  className="block w-full cursor-pointer rounded px-4 py-2 text-center text-red-500 hover:bg-primary hover:text-white"
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
