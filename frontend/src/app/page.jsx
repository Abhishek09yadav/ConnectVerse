"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login"); // or "/login" if you have that route
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-lg">
      Redirecting...
    </div>
  );
}
