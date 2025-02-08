import React from 'react'

const page = () => {
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
  )
}

export default page;
