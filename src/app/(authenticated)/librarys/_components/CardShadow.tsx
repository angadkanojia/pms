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
        className="flex cursor-pointer flex-col items-center justify-center gap-1"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="h-1 w-1 rounded-full bg-gray-700"></div>
        <div className="h-1 w-1 rounded-full bg-gray-700"></div>
        <div className="h-1 w-1 rounded-full bg-gray-700"></div>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute -top-24 right-2 z-10 w-32 rounded-md border bg-white p-2 shadow-lg"
        >
          <button className="block w-full px-3 py-1 text-left hover:bg-gray-100">
            Edit
          </button>
          <button className="block w-full px-3 py-1 text-left hover:bg-gray-100">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CardShadow;
