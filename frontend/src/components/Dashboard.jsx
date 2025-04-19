"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSimilarUsers, getCurrentUser } from "@/utils/api";

import { FaUserFriends, FaMapMarkerAlt, FaPaintBrush, FaWhatsapp } from "react-icons/fa";

import { HiOutlineExclamationCircle, HiOutlineUsers } from "react-icons/hi";

export default function Dashboard() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("findhobby-token");
    if (!token) {
      router.push("/registerform");
      return;
    }
    fetchUserAndSimilarUsers(token);
  }, []);

  const fetchUserAndSimilarUsers = async (token) => {
    try {
      const userData = await getCurrentUser();
      setCurrentUser(userData.user);
      const similarUsers = await getSimilarUsers(userData.user.city);
      const filtered = similarUsers.filter((u) => u._id !== userData.user.id);
      setUsers(filtered);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-red-50 text-red-700 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3">
          <HiOutlineExclamationCircle className="w-6 h-6" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Find Hobby Buddies in   {currentUser?.city}
            </h1>
            {/* <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="mr-2" />
              <span className="text-lg">{currentUser?.city}</span>
            </div> */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => {
            const commonHobbies =
              Array.isArray(currentUser?.hobbies) && Array.isArray(user.hobbies)
                ? user.hobbies.filter((hobby) =>
                    currentUser.hobbies.includes(hobby)
                  )
                : [];

            return (
              <div
                key={user._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <img
                        src={user.profileImage || "/profile.png"}
                        alt={user.name}
                        className="h-16 w-16 rounded-full object-cover ring-4 ring-blue-100"
                      />
                      <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1.5">
                        <FaUserFriends className="text-white text-xs" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {user.name}
                      </h2>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaPaintBrush className="mr-2" />
                      <span className="font-medium">Common Hobbies</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {commonHobbies.map((hobby) => (
                        <span
                          key={hobby}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
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
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <HiOutlineUsers className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Hobby Buddies Found
              </h3>
              <p className="text-gray-600">
                We couldn't find any users with similar hobbies in your city.
                Try checking back later!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
