"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosConfig";
import Link from "next/link";

const HOBBIES = [
  "Reading",
  "Writing",
  "Photography",
  "Painting",
  "Drawing",
  "Music",
  "Dancing",
  "Cooking",
  "Gardening",
  "Traveling",
  "Sports",
  "Gaming",
  "Chess",
  "Hiking",
  "Cycling",
  "Swimming",
  "Yoga",
  "Meditation",
  "Knitting",
  "Pottery",
];

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    hobbies: [],
  });
  const [error, setError] = useState("");

  const handleHobbyToggle = (hobby) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobby)
        ? prev.hobbies.filter((h) => h !== hobby)
        : [...prev.hobbies, hobby],
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await axiosInstance.post(
      `/api/auth/register`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    // Store token in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Redirect to dashboard
    router.push("/dashboard");
  } catch (err) {
    setError(err.response?.data?.message || "Registration failed");
  }
};

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="number"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Hobbies
          </label>
          <div className="grid grid-cols-2 gap-2">
            {HOBBIES.map((hobby) => (
              <label key={hobby} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={formData.hobbies.includes(hobby)}
                  onChange={() => handleHobbyToggle(hobby)}
                />
                <span className="text-sm text-gray-700">{hobby}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-700">
        Already a user?{" "}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-4 w-full text-sm text-blue-600 hover:underline cursor-pointer"
        >
          Already a user? Login here
        </button>
      </p>
    </div>
  );
}
