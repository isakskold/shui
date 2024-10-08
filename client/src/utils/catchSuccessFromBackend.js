// Utility function to handle successful responses from the backend
const catchSuccessFromBackend = (statusCode, message, newMessage = null) => {
  if (newMessage) {
    return {
      statusCode,
      message, // Success message
      newMessage, // Actual text message
    };
  }

  return {
    statusCode,
    message,
  };
};

export default catchSuccessFromBackend;
