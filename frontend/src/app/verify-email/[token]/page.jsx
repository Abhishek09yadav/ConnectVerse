"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { verifyEmail } from "@/utils/api";

export default function VerifyEmail({ params }) {
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const router = useRouter();
  const { token } = params;

  useEffect(() => {
    if (token) {
      verifyEmail(token)
        .then((data) => {
          console.log("verification data", data);
          setVerificationStatus("success");

          // Redirect to login page after 3 seconds
          setTimeout(() => {
            router.push("/login");
          }, 3000);
          // Redirect to login page after 3 seconds
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        })
        .catch((e) => {
          console.log("error during email verification", e);
          setVerificationStatus("error");
        });
    }
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          {verificationStatus === "verifying" && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Verifying your email...</p>
            </div>
          )}

          {verificationStatus === "success" && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="mt-4 text-green-600">
                Email verified successfully!
              </p>
              <p className="mt-2 text-gray-600">Redirecting to login page...</p>
            </div>
          )}

          {verificationStatus === "error" && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="mt-4 text-red-600">Verification failed</p>
              <p className="mt-2 text-gray-600">
                The verification link may be invalid or expired.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
