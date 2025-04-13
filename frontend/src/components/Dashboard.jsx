"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosConfig";
import Logout from "./logout";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("findhobby-token");
    console.log("user", user);
    if (!user) {
      router.push("/registerform");
      return;
    }
    fetchUsers(user);
  }, []);

  const fetchUsers = async (user) => {
    try {
      const token = localStorage.getItem("findhobby-token");

      const response = await axiosInstance.get(`/api/users/similar`, {
        params: { city: user.city },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filtered = response.data.filter((u) => u._id !== user.id);
      console.log("Filtered Users:", filtered); // Debugging line
      setUsers(filtered);
      setCurrentUser(user); // <- set user here after successful fetch
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-red-50 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Find Hobby Buddies in {currentUser?.city}
        </h1>
        {/* <div className="flex items-center space-x-4">
          <Link
            href="/settings"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Settings
          </Link>
          <Logout />
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => {
          // Find common hobbies
          const commonHobbies =
            Array.isArray(currentUser?.hobbies) && Array.isArray(user.hobbies)
              ? user.hobbies.filter((hobby) =>
                  currentUser.hobbies.includes(hobby)
                )
              : [];

          return (
            <div key={user._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={user.profileImage || "/default-avatar.png"}
                  alt={user.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <h2 className="text-xl font-semibold">{user.name}</h2>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Common Hobbies:
                </h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {commonHobbies.map((hobby) => (
                    <span
                      key={hobby}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {commonHobbies.length} matching hobbies
                </span>
                <button
                  onClick={() => {
                    const phone = user.phone || "";
                    const message = `Hi ${user.name}, I saw we share some hobbies! Want to connect?`;
                    const whatsappUrl = `https://wa.me/91${phone}?text=${encodeURIComponent(
                      message
                    )}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Message
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {users.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No users found with similar hobbies in your city.
        </div>
      )}
    </div>
  );
}
