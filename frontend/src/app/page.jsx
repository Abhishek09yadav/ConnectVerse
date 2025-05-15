"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
     if (pathname === "/forgot-password" || pathname === "/registerform")
       return;
    const user = localStorage.getItem("findhobby-token");
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
