
"use client";
import React, { useState } from "react";
import Sidebar from "./Header/Sidebar";
import Header from "./Header/Header";


const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <Header toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
        {/* Page Content */}
        <main className="p-4">{children}</main>
       
      </div>
    </div>
  );
};

export default PageLayout
