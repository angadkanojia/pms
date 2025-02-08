"use client";
import { useState, useEffect, useRef } from "react";

const CardShadow = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !(menuRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative mb-1">
      <div
        className="flex flex-col items-center justify-center gap-1 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
        <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
        <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute right-6 -top-32 bg-white shadow-lg rounded-md border p-2 w-32 z-10"
        >
          <button className="block w-full text-left px-3 py-1 hover:bg-gray-100">
            Edit
          </button>
          <button className="block w-full text-left px-3 py-1 hover:bg-gray-100">
            Delete
          </button>
          <button className="block w-full text-left px-3 py-1 hover:bg-gray-100">
            Preview
          </button>
        </div>
      )}
    </div>
  );
};

export default CardShadow;
