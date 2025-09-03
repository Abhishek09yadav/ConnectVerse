import axios from "axios";
import axiosInstance from "./axiosConfig";
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
// Auth API calls
export const login = async (formData) => {
  const response = await axiosInstance.post("/api/auth/login", formData);
  return response.data;
};

export const register = async (formData) => {
  const response = await axiosInstance.post("/api/auth/register", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// User API calls
export const getUserProfile = async () => {
  const response = await axiosInstance.get("/api/users/profile");
  return response.data;
};

export const updateUserProfile = async (formData) => {
  const response = await axiosInstance.put("/api/users/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getSimilarUsers = async (city) => {
  const response = await axiosInstance.get("/api/users/similar", {
    params: { city },
  });
  return response.data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("findhobby-token");
  if (!token) {
    throw new Error("No token found");
  }
  const response = await axiosInstance.get("/api/auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Friend request API calls
export const sendFriendRequest = async (userId) => {
  const response = await axiosInstance.post(
    `/api/users/friend-request/${userId}`
  );
  return response.data;
};

export const respondToFriendRequest = async (requestId, action) => {
  const response = await axiosInstance.post(
    `/api/users/friend-request/${requestId}/respond`,
    { action }
  );
  return response.data;
};

export const getFriendRequests = async () => {
  const response = await axiosInstance.get("/api/users/friend-requests");
  return response.data;
};

export const getFriends = async () => {
  const response = await axiosInstance.get("/api/users/friends");
  return response.data;
};

export const requestPasswordReset = async (email) => {
  const response = await axiosInstance.post("/api/auth/forgot-password", {
    email,
  });
  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  const response = await axiosInstance.post("/api/auth/reset-password", {
    token,
    newPassword,
  });
  return response.data;
};

export const verifyEmail = async (token) => {
  try {
    const response = await axiosInstance.get(`/api/auth/verify-email/${token}`);
    return response.data;
  } catch (error) {
    console.error("Verification error:", error);
  }
};

export const resendVerificationEmail = async (email) => {
  try {
    const response = await axiosInstance.post(`/api/auth/resend-verification`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// news api
export const dailyNews = async () => {
  try {
    const response = await axios.get(
      `https://newsdata.io/api/1/latest?apikey=${NEWS_API_KEY}&country=in&prioritydomain=top`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
