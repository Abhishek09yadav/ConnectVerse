"use client";
import { useState, useEffect } from "react";
import { FaUserFriends, FaUser } from "react-icons/fa";
import { getFriends } from "@/utils/api";
import UserProfileModal from "@/components/UserProfileModal";
import { useRouter } from "next/navigation";

export default function MyFriends() {
  const [friends, setFriends] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      setLoading(true);
      const friendsList = await getFriends();
      setFriends(friendsList);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch friends");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-6">
      <h1 className="text-4xl font-extrabold text-indigo-800 mb-8 text-center">
        My Friends
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {friends.length === 0 ? (
          <EmptyState message="No Friends Yet" />
        ) : (
          friends.map((friend) => (
            <div
              key={friend._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={friend.profileImage || "/profile.png"}
                    alt={friend.name}
                    className="h-16 w-16 rounded-full object-cover ring-4 ring-indigo-100"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {friend.name}
                    </h2>
                    <p className="text-sm text-gray-500">{friend.email}</p>
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {friend.hobbies.slice(0, 3).map((hobby) => (
                    <span
                      key={hobby}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-auto">
                <span className="text-sm text-gray-500">{friend.city}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedUser(friend)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition cursor-pointer"
                  >
                    <FaUser className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() =>
                      router.push(`/friends/chatScreen/${friend._id}`)
                    }
                    className="flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition cursor-pointer"
                  >
                    <FaUserFriends className="w-4 h-4 " />
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      <p className="text-indigo-600 font-medium text-lg">Loading friends...</p>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="col-span-full flex flex-col items-center text-center bg-white rounded-2xl shadow-lg p-8 mx-auto max-w-md">
      <FaUserFriends className="w-16 h-16 text-indigo-300 mb-4" />
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{message}</h3>
      <p className="text-gray-600 mb-4">
        Start connecting with like-minded people!
      </p>
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
        onClick={() => alert("Go to find friends page or action")}
      >
        Find Friends
      </button>
    </div>
  );
}
