"use client";
import { useState, useEffect } from "react";
import {
  FaUserFriends,
  FaUserCheck,
  FaUserTimes,
  FaUser,
} from "react-icons/fa";
import {
  sendFriendRequest,
  respondToFriendRequest,
  getFriendRequests,
  getFriends,
} from "@/utils/api";
import UserProfileModal from "@/components/UserProfileModal";

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState("requests"); // 'requests' or 'friends'
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchFriendData();
  }, []);

  const fetchFriendData = async () => {
    try {
      setLoading(true);
      const [requests, friendsList] = await Promise.all([
        getFriendRequests(),
        getFriends(),
      ]);
      setFriendRequests(requests);
      setFriends(friendsList);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch friend data");
    } finally {
      setLoading(false);
    }
  };

  const handleRespondToRequest = async (requestId, action) => {
    try {
      await respondToFriendRequest(requestId, action);
      // Refresh the data
      fetchFriendData();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to process friend request"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Friends
            </h1>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "requests"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("requests")}
          >
            Friend Requests
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "friends"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("friends")}
          >
            My Friends
          </button>
        </div>

        {activeTab === "requests" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {friendRequests.length === 0 ? (
              <div className="col-span-full">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto text-center">
                  <FaUserFriends className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Pending Requests
                  </h3>
                  <p className="text-gray-600">
                    You don't have any pending friend requests at the moment.
                  </p>
                </div>
              </div>
            ) : (
              friendRequests.map((request) => (
                <div
                  key={request._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={request.from.profileImage || "/profile.png"}
                        alt={request.from.name}
                        className="h-16 w-16 rounded-full object-cover ring-4 ring-blue-100"
                      />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                          {request.from.name}
                        </h2>
                        <p className="text-gray-500 text-sm">
                          {request.from.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() =>
                          handleRespondToRequest(request._id, "accept")
                        }
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <FaUserCheck className="w-4 h-4" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() =>
                          handleRespondToRequest(request._id, "reject")
                        }
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <FaUserTimes className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {friends.length === 0 ? (
              <div className="col-span-full">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto text-center">
                  <FaUserFriends className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Friends Yet
                  </h3>
                  <p className="text-gray-600">
                    Start connecting with people who share your hobbies!
                  </p>
                </div>
              </div>
            ) : (
              friends.map((friend) => (
                <div
                  key={friend._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
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

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {friend.hobbies.slice(0, 3).map((hobby) => (
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
                        {friend.city}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedUser(friend)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <FaUser className="w-4 h-4" />
                          <span>View Profile</span>
                        </button>
                        <button
                          onClick={() =>
                            window.open(
                              `https://wa.me/91${friend.phone}`,
                              "_blank"
                            )
                          }
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <FaUserFriends className="w-4 h-4" />
                          <span>Message</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
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
