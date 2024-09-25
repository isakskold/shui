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
