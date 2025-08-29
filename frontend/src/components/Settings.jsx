"use client";
import { useState, useEffect, useRef } from "react";
import { getUserProfile, updateUserProfile } from "@/utils/api";
import AVAILABLE_HOBBIES from "./Hobbies";
import { FaSpinner, FaTimes, FaUpload } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    hobbies: [],
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isHobbyDropdownOpen, setIsHobbyDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const userData = await getUserProfile();
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          city: userData.city || "",
          hobbies: Array.isArray(userData.hobbies)
            ? userData.hobbies
            : JSON.parse(userData.hobbies || "[]"),
        });
        setImagePreview(userData.profileImage || "");
      } catch {
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsHobbyDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleHobby = (hobby) =>
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobby)
        ? prev.hobbies.filter((h) => h !== hobby)
        : [...prev.hobbies, hobby],
    }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      if (profileImage) formDataToSend.append("profileImage", profileImage);

      Object.entries(formData).forEach(([key, value]) =>
        formDataToSend.append(
          key,
          key === "hobbies" ? JSON.stringify(value) : value
        )
      );

      await updateUserProfile(formDataToSend);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );

  const availableHobbies = AVAILABLE_HOBBIES.filter(
    (hobby) => !formData.hobbies.includes(hobby)
  );

  return (
    <div className="font-sans text-gray-800 bg-gray-50 flex justify-center items-center min-h-screen p-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-3xl bg-white p-8 md:p-12 rounded-2xl shadow-xl border">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
          Edit Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Image */}
          <div className="flex flex-col items-center space-y-4">
            <div
              className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg cursor-pointer hover:scale-105 transition"
              onClick={() => fileInputRef.current.click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                  <FaUpload className="mr-2" /> Upload
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
                  {field[0].toUpperCase() + field.slice(1)}
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
                  onChange={handleChange}
                  className="w-full border rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                />
              </div>
            ))}
          </div>

          {/* Hobbies */}
          <div>
            <h3 className="text-lg font-bold">Your Hobbies</h3>
            <div className="relative" ref={dropdownRef}>
              <div
                className="w-full p-2 border rounded-lg flex flex-wrap gap-2 cursor-pointer hover:border-blue-400"
                onClick={() => setIsHobbyDropdownOpen((o) => !o)}
              >
                {formData.hobbies.length ? (
                  formData.hobbies.map((hobby) => (
                    <span
                      key={hobby}
                      className="flex items-center bg-blue-50 text-blue-800 text-sm px-3 py-1 rounded-full border hover:bg-red-100 hover:text-red-800"
                    >
                      {hobby}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleHobby(hobby);
                        }}
                        className="ml-2 text-blue-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">Select your hobbies...</span>
                )}
              </div>
              {isHobbyDropdownOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-1 p-2">
                    {availableHobbies.map((hobby) => (
                      <label
                        key={hobby}
                        className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.hobbies.includes(hobby)}
                          onChange={() => toggleHobby(hobby)}
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

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg text-lg font-medium text-white flex justify-center items-center transition ${
              isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Updating...
              </>
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
