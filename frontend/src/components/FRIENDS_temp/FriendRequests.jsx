"use client";
import { useState, useEffect } from "react";
import { FaUserFriends, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { getFriendRequests, respondToFriendRequest } from "@/utils/api";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function FriendRequests() {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const requests = await getFriendRequests();
      setFriendRequests(requests);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch friend requests"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (requestId, action) => {
    try {
      await respondToFriendRequest(requestId, action);
      fetchRequests();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to process request");
    }
  };

  const handleRespondWithConfirm = (requestId, action) => {
    confirmAlert({
      title: `${action === "accept" ? "Accept" : "Reject"} Friend Request`,
      message: `Are you sure you want to ${action} this friend request?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => handleRespond(requestId, action),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Friend Requests</h1>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {friendRequests.length === 0 ? (
          <EmptyState message="No Pending Requests" />
        ) : (
          friendRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
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
                  <p className="text-gray-500 text-sm">{request.from.email}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() =>
                    handleRespondWithConfirm(request._id, "accept")
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-[#74B9FF] text-white rounded-lg hover:bg-[#0A79DF] transition duration-200 shadow-md"
                >
                  <FaUserCheck className="w-4 h-4" />
                  <span>Accept</span>
                </button>
                <button
                  onClick={() =>
                    handleRespondWithConfirm(request._id, "reject")
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 shadow-md"
                >
                  <FaUserTimes className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
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
          You don't have any friend requests right now.
        </p>
      </div>
    </div>
  );
}
