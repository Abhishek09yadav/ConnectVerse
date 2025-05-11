"use client";
import { Dialog } from "primereact/dialog";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaintBrush,
} from "react-icons/fa";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function UserProfileModal({ user, onClose }) {
  if (!user) return null;

  return (
    <Dialog
      header="User Profile"
      visible={!!user}
      onHide={onClose}
      dismissableMask
      className="rounded-2xl"
      style={{ width: "90vw", maxWidth: "600px" }} // Responsive width
    >
      <div className="flex flex-col sm:flex-row gap-6 p-2 sm:p-4">
        <div className="flex justify-center sm:block">
          <img
            src={user.profileImage || "/profile.png"}
            alt={user.name}
            className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover ring-4 ring-blue-100"
          />
        </div>

        <div className="flex-1 space-y-3 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <FaUser className="text-gray-500" />
            <span className="font-medium">{user.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaEnvelope className="text-gray-500" />
            <span className="text-gray-600 break-all">{user.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaPhone className="text-gray-500" />
            <span className="text-gray-600">{user.phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-500" />
            <span className="text-gray-600">{user.city}</span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
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
    </Dialog>
  );
}
