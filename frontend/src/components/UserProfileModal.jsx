"use client";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaintBrush,
} from "react-icons/fa";

export default function UserProfileModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={user.profileImage || "/profile.png"}
              alt={user.name}
              className="h-32 w-32 rounded-full object-cover ring-4 ring-blue-100"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-center space-x-3">
              <FaUser className="text-gray-500" />
              <span className="text-lg font-medium">{user.name}</span>
            </div>

            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-gray-500" />
              <span className="text-gray-600">{user.email}</span>
            </div>

            <div className="flex items-center space-x-3">
              <FaPhone className="text-gray-500" />
              <span className="text-gray-600">{user.phone}</span>
            </div>

            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-gray-500" />
              <span className="text-gray-600">{user.city}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <FaPaintBrush className="text-gray-500" />
                <span className="font-medium">Hobbies</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
