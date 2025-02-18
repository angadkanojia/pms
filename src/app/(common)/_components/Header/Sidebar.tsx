"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "./MenuItems";
import Image from 'next/image';

const Sidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const pathname = usePathname();

  return (
    <div
      className={`h-screen border-b border-r bg-white transition-all duration-300 text-center ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* LOGO */}
      <div
        className={`text-2xl font-bold mb-1 text-center text-primary transition-all px-2 py-2  ${isCollapsed ? "text-center" : "text-left"
          }`}
      >
        {isCollapsed ? (
          <Image src="/Icon.svg" alt="Logo" width={70} height={40} className="h-24" />
        ) : (
          <Image src="/logo-p.png" alt="Logo" width={250} height={40}  className="object-cover h-24 text-center" />
        )}
      </div>

      <hr className="border-gray-300" />

      {/* Navigation */}
      <nav>
        <ul className="mt-5 space-y-3 px-3">
          {menuItems.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className={`group flex items-center rounded-lg border border-transparent p-2 text-2xl text-gray-900 transition duration-200 hover:border-blue-600 hover:text-blue-600 dark:text-white ${
                  pathname === item.href ? "bg-blue-100 text-blue-600" : ""
                }`}
              >
                {/* Icon */}
                <span className="h-5 w-5 shrink-0 text-gray-500 transition duration-75 group-hover:text-blue-600 dark:text-gray-400">
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
