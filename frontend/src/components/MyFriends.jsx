"use client";
import { useState, useEffect } from "react";
import { FaUserFriends, FaUser } from "react-icons/fa";
import { getFriends } from "@/utils/api";
import UserProfileModal from "@/components/UserProfileModal";

export default function MyFriends() {
  const [friends, setFriends] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Friends</h1>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {friends.length === 0 ? (
          <EmptyState message="No Friends Yet" />
        ) : (
          friends.map((friend) => (
            <div
              key={friend._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={friend.profileImage || "/profile.png"}
                  alt={friend.name}
                  className="h-16 w-16 rounded-full object-cover ring-4 ring-blue-100"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {friend.name}
                  </h2>
                  <p className="text-gray-500 text-sm">{friend.email}</p>
                </div>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {friend.hobbies.slice(0, 3).map((hobby) => (
                  <span
                    key={hobby}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">{friend.city}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedUser(friend)}
                    className="btn-blue"
                  >
                    <FaUser className="w-4 h-4" />
                    <span>View Profile</span>
                  </button>
                  <button
                    onClick={() =>
                      window.open(`https://wa.me/91${friend.phone}`, "_blank")
                    }
                    className="btn-green"
                  >
                    <FaUserFriends className="w-4 h-4" />
                    <span>Message</span>
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
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="col-span-full">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto text-center">
        <FaUserFriends className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{message}</h3>
        <p className="text-gray-600">
          Start connecting with people who share your hobbies!
        </p>
      </div>
    </div>
  );
}
