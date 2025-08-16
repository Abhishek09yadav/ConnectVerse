"use client";
import React from "react";
import ChatScreen from "@/components/friends/ChatScreen";
import { useParams } from "next/navigation";
const page = () => {
  const params = useParams();
  return (
    <div>
      <ChatScreen id={params?.id} />
    </div>
  );
};

export default page;
