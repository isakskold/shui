// src/api.js
import axios from "axios";

const API_BASE_URL = "https://a4vg2fyyoj.execute-api.eu-north-1.amazonaws.com";
const API_KEY = import.meta.env.VITE_API_KEY;

// Create an instance of Axios with the base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY, // Include the API key from .env
  },
});

// Add a request interceptor to include the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = accessToken; // Add the access token to the headers
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Fetch messages from DynamoDB
export const fetchMessages = async () => {
  try {
    const response = await apiClient.get("/messages");
    return response.data; // Axios automatically parses JSON
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Send message to DynamoDB
export const sendMessage = async (data) => {
  try {
    const response = await apiClient.post("/message", data);
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

// Delete message from DynamoDB (using message ID)
export const deleteMessage = async (id) => {
  try {
    const response = await apiClient.delete(`/message/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};

// Update message in DynamoDB (using message ID)
export const updateMessage = async (id, data) => {
  try {
    const response = await apiClient.put(`/message/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating message:", error);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post("/users/login", credentials);
    const { accessToken, refreshToken } = response.data;

    // Store tokens in localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    console.log(localStorage.accessToken, localStorage.refreshToken);

    // Return user data or any additional info if needed
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Logout user
export const logoutUser = () => {
  // Remove tokens from localStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  // Optionally clear Authorization header
  delete apiClient.defaults.headers.Authorization;
};

// Refresh access token
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available.");
  }

  try {
    const response = await apiClient.post("/users/refreshToken", {
      refreshToken,
    });
    const { accessToken } = response.data;

    // Store the new access token
    localStorage.setItem("accessToken", accessToken);

    return accessToken; // Return the new access token if needed
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};
