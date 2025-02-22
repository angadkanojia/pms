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
            <li
              key={item.title}
              className={`group rounded-lg border border-transparent p-2 text-2xl transition duration-200 hover:border-primary hover:text-primary ${
                pathname === item.href ? "bg-blue-100 text-primary" : ""
              } ${isCollapsed ? "justify-center" : "justify-start"}`}
            >
              <Link
                title={item?.title}
                href={item.href}
                className="flex items-center justify-center gap-2"
              >
                {/* Icon */}
                <span className="shrink-0">{item.icon}</span>
                {/* Show title only when open */}
                {!isCollapsed && (
                  <span title={item?.title} className="flex-1">
                    {item?.title || "Untitled"}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
