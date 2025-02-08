"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const pathname = usePathname();

  const menuItems = [
    { title: "Dashboard", href: "/", icon: (
        <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
          <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
        </svg>
      ) 
    },
    { title: "Library", href: "/library", icon: (
        <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
          <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
        </svg>
      )
    },
    { title: "Proposals", href: "/proposals", icon: (
        <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
          <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
        </svg>
      )
    },
    { title: "Section Builder", href: "/section-builder", icon: (
        <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
          <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
        </svg>
      )
    },
    { title: "Contact", href: "/contact", icon: (
        <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
          <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
        </svg>
      )
    },
    { title: "Users", href: "/users", icon: (
        <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
        </svg>
      )
    },
    { title: "Settings", href: "/settings", icon: (
        <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.784 1.893a1 1 0 0 1 .431 1.351l-.89 1.776a5.987 5.987 0 0 1 1.94 1.94l1.776-.89a1 1 0 0 1 1.351.431l1.1 2.2a1 1 0 0 1-.253 1.21l-1.497 1.247a6.059 6.059 0 0 1 0 2.658l1.497 1.247a1 1 0 0 1 .253 1.21l-1.1 2.2a1 1 0 0 1-1.351.431l-1.776-.89a5.987 5.987 0 0 1-1.94 1.94l.89 1.776a1 1 0 0 1-.431 1.351l-2.2 1.1a1 1 0 0 1-1.21-.253l-1.247-1.497a6.058 6.058 0 0 1-2.658 0l-1.247 1.497a1 1 0 0 1-1.21.253l-2.2-1.1a1 1 0 0 1-.431-1.351l.89-1.776a5.987 5.987 0 0 1-1.94-1.94l-1.776.89a1 1 0 0 1-1.351-.431l-1.1-2.2a1 1 0 0 1 .253-1.21l1.497-1.247a6.059 6.059 0 0 1 0-2.658l-1.497-1.247a1 1 0 0 1-.253-1.21l1.1-2.2a1 1 0 0 1 1.351-.431l1.776.89a5.987 5.987 0 0 1 1.94-1.94l-.89-1.776a1 1 0 0 1 .431-1.351l2.2-1.1a1 1 0 0 1 1.21.253l1.247 1.497a6.058 6.058 0 0 1 2.658 0l1.247-1.497a1 1 0 0 1 1.21-.253l2.2 1.1a1 1 0 0 1 .253 1.21l-1.1 2.2a1 1 0 0 1-1.351.431l-1.776-.89a5.987 5.987 0 0 1-1.94-1.94l.89-1.776a1 1 0 0 1 .431-1.351l1.1-2.2a1 1 0 0 1 1.21-.253l1.247 1.497a6.058 6.058 0 0 1 0 2.658l1.247 1.497a1 1 0 0 1 .253 1.21l-1.1 2.2a1 1 0 0 1-1.351-.431l-1.776-.89a5.987 5.987 0 0 1-1.94-1.94l-.89-1.776a1 1 0 0 1 .431-1.351l1.1-2.2a1 1 0 0 1 1.351-.431l1.247 1.497a6.058 6.058 0 0 1 2.658 0Z" />
        </svg>
      )
    }
  ];

  return (
    <div
      className={`h-screen bg-white border-r p-4 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* LOGO */}
      <div
        className={`text-4xl font-bold mb-8 mt-5 text-center text-blue-600 transition-all ${
          isCollapsed ? "text-center" : "text-left"
        }`}
      >
        {isCollapsed ? "🔹" : "LOGO"}
      </div>

      <hr className="border-gray-300" />

      {/* Navigation */}
      <nav>
        <ul className="space-y-3 mt-5">
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
