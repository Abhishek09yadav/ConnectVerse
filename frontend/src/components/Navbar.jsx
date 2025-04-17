"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation"; // For handling redirects
import Logout from "./logout";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter(); // Initialize router
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Settings", href: "/settings" },
    { label: <Logout />, href: "#" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold text-blue-600">
          FindHobby
        </Link>

        <div className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </div>

        <ul
          className={`md:flex space-x-6 ${
            open ? "block" : "hidden"
          } md:block absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent px-6 md:px-0 flex justify-center items-center`}
        >
          {menuItems.map((item) => (
            <li key={item.href} className="py-2 md:py-0">
              {item.href === "#" ? (
                <button
                  onClick={item.onClick}
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
