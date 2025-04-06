"use client";

import { useRouter } from 'next/navigation';
import React from 'react'


const Logout = () => {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
}

  return (
    <button onClick={handleLogout} className='bg-red-600 h-5 rounded-xl hover:cursor-pointer text-sm'>logout</button>
  )
}

export default Logout