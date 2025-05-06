"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import {
  Menu,
  Users,
  Edit3,
  Settings,
  Home,
  BookOpen,
  Bell,
  LogOut,
} from "lucide-react";

export default function SidebarMenu() {
  const [visible, setVisible] = useState(false);

  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard", color: "text-blue-600" },
    { icon: <Users size={20} />, label: "View Users", color: "text-green-600" },
    {
      icon: <Edit3 size={20} />,
      label: "Edit Hobbies",
      color: "text-purple-600",
    },
    {
      icon: <BookOpen size={20} />,
      label: "Resources",
      color: "text-yellow-600",
    },
    { icon: <Bell size={20} />, label: "Notifications", color: "text-red-600" },
    { icon: <Settings size={20} />, label: "Settings", color: "text-gray-600" },
    { icon: <LogOut size={20} />, label: "Logout", color: "text-red-500" },
  ];

  return (
    <div className="p-4">
      <Button
        onClick={() => setVisible(true)}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        <Menu size={20} />
        <span>Open Menu</span>
      </Button>

      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="w-64"
      >
        <div className="p-4">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            {/* <img
              src="/path-to-your-logo.png"
              alt="Logo"
              className="h-12 w-auto"
            /> */}
            <p className="text-2xl font-bold text-blue-600 border-4 border-blue-200 rounded-lg  p-3 ">Find Hobby</p>
          </div>

          <h2 className="text-xl font-bold mb-6 text-gray-800">Menu</h2>

          <div className="flex flex-col gap-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 cursor-pointer transition-all"
              >
                <div className={item.color}>{item.icon}</div>
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
