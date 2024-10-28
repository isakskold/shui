import { apiClient } from "./api";
import catchErrorFromBackend from "../utils/catchErrorFromBackend";

// Fetch messages from DynamoDB
export const fetchMessagesByTopic = async (topic) => {
  try {
    const response = await apiClient.get(`/messages?topic=${topic}`);
    return response.data; // Axios automatically parses JSON
  } catch (error) {
    throw catchErrorFromBackend(error.response?.status, error);
  }
};
