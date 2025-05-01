"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, Users, UserPlus, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation"; // For handling redirects
import Logout from "./logout";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { label: "Home", href: "/", icon: <Home size={18} className="mr-2" /> },
    {
      label: "My Friends",
      href: "/myFriends",
      icon: <Users size={18} className="mr-2" />,
    },
    {
      label: "Friend Requests",
      href: "/friendRequests",
      icon: <UserPlus size={18} className="mr-2" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings size={18} className="mr-2" />,
    },
    {
      label: <Logout />,
      href: "#",
      icon:'',
    },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
          FindHobby
        </Link>

        <div className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? (
            <X className="h-6 w-6 text-gray-800" />
          ) : (
            <Menu className="h-6 w-6 text-gray-800" />
          )}
        </div>

        <ul
          className={`md:flex md:space-x-6 space-y-4 md:space-y-0 ${
            open ? "block" : "hidden"
          } md:block absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent px-6 md:px-0 py-4 md:py-0 shadow-md md:shadow-none`}
        >
          {menuItems.map((item, index) => (
            <li key={index} className="flex items-center py-2 md:py-0">
              {item.href === "#" ? (
                <button
                  onClick={item.onClick}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition"
                >
                  {item.icon}
                  {item.label}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition"
                >
                  {item.icon}
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
