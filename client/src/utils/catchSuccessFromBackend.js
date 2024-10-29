// Utility function to handle successful responses from the backend
const catchSuccessFromBackend = (statusCode, message, content = null) => {
  if (content) {
    return {
      statusCode,
      message, // Success message
      content, // Actual text message
    };
  }

  return {
    statusCode,
    message,
  };
};

export default catchSuccessFromBackend;
