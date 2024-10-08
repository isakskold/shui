// Utility function to handle errors from the backend
const catchErrorFromBackend = (statusCode, error) => {
  if (error) {
    return {
      statusCode: statusCode || error.status,
      message: error,
    };
  } else {
    console.error("Error:", error);
    return {
      statusCode: statusCode || 500, // Default to 500 if no status is provided
      message: "An unexpected error occurred", // Fallback error message
    };
  }
};

export default catchErrorFromBackend;
