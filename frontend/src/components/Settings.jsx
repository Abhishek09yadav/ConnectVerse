"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile, updateUserProfile } from "@/utils/api";
import AVAILABLE_HOBBIES from './Hobbies'

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    hobbies: [],
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [removePhoto, setRemovePhoto] = useState(false);
  const [isHobbyDropdownOpen, setIsHobbyDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);

        let hobbies = [];
        if (Array.isArray(userData.hobbies)) {
          hobbies = userData.hobbies;
        } else if (typeof userData.hobbies === "string") {
          try {
            hobbies = JSON.parse(userData.hobbies);
          } catch {
            hobbies = [];
          }
        }

        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          city: userData.city || "",
          hobbies: hobbies || [],
        });
        setImagePreview(userData.profileImage || "");
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsHobbyDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHobbySelect = (hobby) => {
    if (!formData.hobbies.includes(hobby)) {
      setFormData((prev) => ({
        ...prev,
        hobbies: [...prev.hobbies, hobby],
      }));
    }
  };

  const handleHobbyRemove = (hobby) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((h) => h !== hobby),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setRemovePhoto(false);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfileImage(null);
    setImagePreview("");
    setRemovePhoto(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      if (removePhoto) {
        formDataToSend.append("removePhoto", "true");
      } else if (profileImage) {
        formDataToSend.append("profileImage", profileImage);
      }
      Object.keys(formData).forEach((key) => {
        if (key === "hobbies") {
          // Send the hobbies as a JSON string
          formDataToSend.append(key, JSON.stringify(formData[key] || []));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const updatedUser = await updateUserProfile(formDataToSend);
      setUser(updatedUser);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Filter the available hobbies to show only those not yet selected
  const availableHobbiesForSelection = AVAILABLE_HOBBIES.filter(
    (hobby) => !formData.hobbies.includes(hobby)
  );

  return (
    <div className="font-sans text-gray-800 bg-gray-50 flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-3xl bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
          Edit Your Profile
        </h1>

        {success && (
          <div className="mb-6 bg-green-100 text-green-700 p-4 rounded-lg">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-100 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Image */}
          <div className="flex flex-col items-center space-y-4">
            <div
              className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg group cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => fileInputRef.current.click()}
            >
              {imagePreview || user?.profileImage ? (
                <img
                  src={imagePreview || user?.profileImage}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 transition-colors duration-300">
                  <div className="text-center font-semibold">Upload Photo</div>
                </div>
              )}
              {(imagePreview || user?.profileImage) && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemovePhoto();
                    }}
                    className="p-2 bg-red-600 bg-opacity-75 text-white rounded-full text-xs shadow hover:bg-opacity-100 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["name", "email", "phone", "city"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-semibold mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={
                    field === "email"
                      ? "email"
                      : field === "phone"
                      ? "tel"
                      : "text"
                  }
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 focus:border-blue-500"
                />
              </div>
            ))}
          </div>

          {/* Hobbies */}
          <div>
            <h3 className="text-lg font-bold">Your Hobbies</h3>
            <div className="relative" ref={dropdownRef}>
              <div
                className="w-full p-2 border border-gray-300 rounded-lg flex flex-wrap gap-2 cursor-pointer transition-all duration-300 hover:border-blue-400"
                onClick={() => setIsHobbyDropdownOpen(!isHobbyDropdownOpen)}
              >
                {formData.hobbies.length > 0 ? (
                  formData.hobbies.map((hobby) => (
                    <span
                      key={hobby}
                      className="flex items-center bg-blue-50 text-blue-800 text-sm font-medium px-3 py-1 rounded-full border border-blue-200 transition-all duration-300 hover:bg-red-100 hover:text-red-800"
                    >
                      {hobby}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleHobbyRemove(hobby);
                        }}
                        className="ml-2 text-blue-500 hover:text-red-700 transition-colors duration-300"
                      >
                        ×
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">Select your hobbies...</span>
                )}
              </div>
              {isHobbyDropdownOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto transition-all duration-300">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-1 p-2">
                    {availableHobbiesForSelection.map((hobby) => (
                      <label
                        key={hobby}
                        className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-all duration-300"
                      >
                        <input
                          type="checkbox"
                          value={hobby}
                          onChange={() => handleHobbySelect(hobby)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <span className="ml-3 text-sm">{hobby}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg text-lg font-medium text-white transition-all duration-300 ${
                isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
