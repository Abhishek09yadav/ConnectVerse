"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login, resendVerificationEmail } from "@/utils/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/authSlice";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [showResendButton, setShowResendButton] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResendVerification = async () => {
    try {
      setIsResending(true);
      setResendMessage("");
      await resendVerificationEmail(formData.email);
      toast.success(
        "Verification email has been resent. Please check your inbox.",
        {
          duration: 6000,
        }
      );
      setResendMessage(
        "Verification email has been resent. Please check your inbox."
      );
    } catch (error) {
      setResendMessage(error.message || "Error resending verification email");
      toast.error(error.message || "Error resending verification email");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResendMessage("");
    setShowResendButton(false);

    try {
      const data = await login(formData);

      console.log("🚀 ~ handleSubmit ~ data:", data);
      dispatch(setCredentials({ authToken: data.token, userData: data.user }));
      localStorage.setItem("findhobby-token", data.token);
      router.push("/dashboard");
    } catch (error) {
      console.log("Login error:", error?.response?.data);
      if (error?.response?.data?.isVerified === false) {
        setError("Please verify your email before logging in.");
        setShowResendButton(true);
      } else {
        setError(error?.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          {showResendButton && (
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={isResending}
                className="bg-blue-600 text-white text-sm p-2 rounded-md hover:bg-blue-500 disabled:opacity-50"
              >
                {isResending ? "Sending..." : "Resend verification email"}
              </button>
            </div>
          )}
          {/* 
          {resendMessage && (
            <div className="text-sm text-center">
              <p
                className={
                  resendMessage.includes("Error")
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                {resendMessage}
              </p>
            </div>
          )} */}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </Link>
            </div>
            <div className="text-sm">
              <Link
                href="/registerform"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
