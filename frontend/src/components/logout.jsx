"use client";

import { useRouter } from 'next/navigation';
import React from 'react'


const Logout = () => {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
}

  return (
    <button
      onClick={handleLogout}
      className="ml-4 inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white text-sm font-medium py-2 px-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"
        />
      </svg>
      Logout
    </button>
  );
}

export default Logout