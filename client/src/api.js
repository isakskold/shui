// src/api.js
import axios from "axios";

const API_BASE_URL = "https://a4vg2fyyoj.execute-api.eu-north-1.amazonaws.com";
const API_KEY = import.meta.env.VITE_API_KEY;
import { checkAuthStatus } from "./utils/checkIfSignedIn";
import { fetchAuthSession } from "aws-amplify/auth";

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

export const sendMessage = async (data) => {
  try {
    // Fetch the authentication session
    const session = await fetchAuthSession();
    // Extract the access token
    const token = session.tokens.accessToken; // Access Token
    // Extract the user ID from the accessToken payload
    const userId = session.tokens.accessToken.payload.sub; // User ID
    // Extract the username from the idToken payload
    const username = session.tokens.idToken.payload["cognito:username"];

    if (!token || !userId || !username) {
      console.error("Error retrieving token, id, or username");
      throw new Error(
        "Failed to retrieve the access token, user id, or username."
      );
    }

    // Create the message payload with the user ID and username included
    const messagePayload = {
      ...data, // Include the existing message data
      userId: userId, // Link the message to the user who sent it
      username: username, // Include the username
    };

    // Include the token in the request header with "Bearer" prefix
    const response = await apiClient.post("/message", messagePayload, {
      headers: {
        Authorization: `Bearer ${token}`, // Add "Bearer" prefix
      },
    });
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
    console.error(
      "Error deleting message:",
      error.response ? error.response.data : error
    );
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
