"use client";
import React from "react";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="w-full bg-white border-b flex items-center justify-between px-5 py-5">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="text-2xl bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
      >
       &lt;&lt;
      </button>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <img
          src="https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-notification-icon-png-image_4144522.jpg"
          alt="Notifications"
          className="w-8 h-8"
        />

        {/* Divider */}
        <div className="bg-gray-300 w-[1px] h-10" />

        {/* User Avatar */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full text-xl flex items-center justify-center">
            👤
          </div>
          <div className="text-sm ml-2">
            <p className="font-medium">User Name</p>
            <p className="text-gray-500 text-xs">username@gmail.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
