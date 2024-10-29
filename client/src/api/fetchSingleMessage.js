import { apiClient } from "./api";
import catchErrorFromBackend from "../utils/catchErrorFromBackend";
import catchSuccessFromBackend from "../utils/catchSuccessFromBackend";

// Fetch messages from DynamoDB
export const fetchSingleMessage = async (id) => {
  try {
    const response = await apiClient.get(`/message/${id}`);

    return catchSuccessFromBackend(
      response.status,
      response.data.message,
      response.data.content
    ); // Axios automatically parses JSON
  } catch (error) {
    throw catchErrorFromBackend(
      error.response?.status || error.statusCode,
      error.response?.data?.message || error.message
    );
  }
};
