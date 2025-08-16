"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Users,
  UserPlus,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getFriendRequests } from "@/utils/api";
import { deleteCredentials } from "@/features/authSlice";
import { useDispatch } from "react-redux";

const NotificationDot = ({ show }) =>
  show ? (
    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
  ) : null;

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [hasFriendRequests, setHasFriendRequests] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const Logout = () => (
    <span onClick={handleLogout} className="flex items-center ">
      <LogOut size={18} className="mr-2" />
      Logout
    </span>
  );

  const handleLogout = () => {
    dispatch(deleteCredentials());
    localStorage.removeItem("findhobby-token");
    router.push("/login");
  };

  const checkFriendRequests = () => {
    getFriendRequests()
      .then((data) => {
        console.log("data ", data);
        if (data.length > 0) {
          setHasFriendRequests(true);
        }
      })
      .catch((e) => console.error("error in fetching friend Request", e));
  };
  useEffect(() => {
    checkFriendRequests();

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      label: "Home",
      href: "/",
      icon: <Home size={18} />,
      gradient: "from-blue-400 to-purple-500",
    },
    {
      label: "My Friends",
      href: "/friends/myFriends",
      icon: <Users size={18} />,
      gradient: "from-green-400 to-blue-500",
    },
    {
      label: "Friend Requests",
      href: "/friends/friendRequests",
      icon: <Bell size={18} />,

      gradient: "from-pink-400 to-red-500",
      hasNotification: hasFriendRequests,
    },
    {
      label: "Suggested Friends",
      href: "/friends/suggestedFriends",
      icon: <UserPlus size={18} />,
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings size={18} />,
      gradient: "from-gray-400 to-gray-600",
    },
  ];

  const navigate = (href) => {
    router.push(href);
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20"
            : "bg-white/60 backdrop-blur-lg shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-15 h-15 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="logo"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ConnectVerse
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Social Network</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {menuItems.map((item, index) => (
                <div key={index} className="relative group ">
                  <button
                    onClick={() => navigate(item.href)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}
                    ></div>
                    <div className="relative z-10 flex items-center space-x-2 cursor-pointer">
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                      {item.hasNotification && <NotificationDot show={true} />}
                    </div>
                  </button>
                </div>
              ))}
              {/* Logout */}
              <div className="relative group">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  <div className="relative z-10">
                    <Logout />
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden relative w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-md"
            >
              <div className="relative w-5 h-5">
                <Menu
                  className={`absolute inset-0 text-gray-700 transition-all duration-300 ${
                    open ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                  }`}
                  size={20}
                />
                <X
                  className={`absolute inset-0 text-gray-700 transition-all duration-300 ${
                    open ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                  }`}
                  size={20}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-white/90 backdrop-blur-xl border-t border-white/20 shadow-xl">
            <div className="px-4 py-2 space-y-1">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigate(item.href)}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-white transition-all duration-300 relative group overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}
                  ></div>
                  <div className="relative z-10 flex items-center space-x-3 w-full">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                    {item.hasNotification && <NotificationDot show={true} />}
                  </div>
                </button>
              ))}
              {/* Mobile Logout */}
              <button
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-white transition-all duration-300 relative group overflow-hidden"
                onClick={() => setOpen(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <div className="relative z-10">
                  <Logout />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
