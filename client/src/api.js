// src/api.js
import axios from "axios";

const API_BASE_URL = "https://a4vg2fyyoj.execute-api.eu-north-1.amazonaws.com";
const API_KEY = import.meta.env.VITE_API_KEY;
import catchErrorFromBackend from "./utils/catchErrorFromBackend";
import catchSuccessFromBackend from "./utils/catchSuccessFromBackend";
import { getSession } from "./utils/getAuthSession";

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
    throw catchErrorFromBackend(error.response?.status, error);
  }
};

export const sendMessage = async (data) => {
  try {
    // Fetch the authentication session
    const session = await getSession("Please login to post a message");

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

    // Create the message payload
    const messagePayload = {
      ...data, // Include the existing message data
    };

    // Include the token in the request header with "Bearer" prefix
    const response = await apiClient.post("/message", messagePayload, {
      headers: {
        Authorization: `Bearer ${token}`, // Add "Bearer" prefix
      },
    });

    return catchSuccessFromBackend(
      response.status,
      response.data.message,
      response.data.newMessage
    );
  } catch (error) {
    console.log(error);

    throw catchErrorFromBackend(
      error.response?.status || error.statusCode,
      error.response?.data?.message || error.message
    );
  }
};

// Delete message from DynamoDB (using message ID)
export const deleteMessage = async (id) => {
  try {
    // Fetch the authentication session
    const session = await getSession("Please login to delete message");

    // Extract the access token
    const token = session.tokens.accessToken; // Access Token

    const response = await apiClient.delete(`/message/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add "Bearer" prefix
      },
    });
    return catchSuccessFromBackend(response.status, response.data.message);
  } catch (error) {
    throw catchErrorFromBackend(
      error.response?.status || error.statusCode,
      error.response?.data?.message || error.message
    );
  }
};

// Update message in DynamoDB (using message ID)
export const updateMessage = async (id, data) => {
  try {
    // Fetch the authentication session
    const session = await getSession("Please login to update message");
    // Extract the access token
    const token = session.tokens.accessToken; // Access Token

    const response = await apiClient.put(`/message/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Add "Bearer" prefix
      },
    });
    return catchSuccessFromBackend(
      response.status,
      response.data.message,
      response.data.newMessage
    );
  } catch (error) {
    throw catchErrorFromBackend(
      error.response?.status || error.statusCode,
      error.response?.data?.message || error.message
    );
  }
};
