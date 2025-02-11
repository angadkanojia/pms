"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "./MenuItems";
const Sidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const pathname = usePathname();

 

  return (
    <div
      className={`h-screen bg-white border-r border-b transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* LOGO */}
      <div
        className={`text-4xl font-bold mb-1 mt-5 text-center text-primary transition-all px-4 py-3 ${
          isCollapsed ? "text-center" : "text-left"
        }`}
      >
        {isCollapsed ? "🔹" : "LOGO"}
      </div>

      <hr className="border-gray-300" />

      {/* Navigation */}
      <nav>
        <ul className="space-y-3 mt-5 px-3">
          {menuItems.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white border border-transparent hover:border-blue-600 hover:text-blue-600 group text-2xl transition duration-200 ${
                  pathname === item.href ? "bg-blue-100 text-blue-600" : ""
                }`}
              >
                {/* Icon */}
                <span className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-600">
                  {item.icon}
                </span>
                {/* Conditionally render the title */}
                {!isCollapsed && <span className="ms-3">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
