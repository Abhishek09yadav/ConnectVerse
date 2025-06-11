"use client"
import VerifyEmail from '@/components/VerifyEmail'
import { useParams } from 'next/navigation';
import React from 'react'


const page = () => {
  // const {token} = params if prams in prop
    const { token } = useParams(); 
  return (
    <div>
      <VerifyEmail token={token} />
    </div>
  )
}

export default page
