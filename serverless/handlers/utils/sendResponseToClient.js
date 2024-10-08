// Utility function to send response to the client
// Include newMessage as an argument in postMessage handler to return the new message to frontend directly
const sendResponseToClient = (statusCode, message, newMessage = null) => {
  // Create the response body object
  const responseBody = {
    message,
  };

  // Include newMessage conditionally
  if (newMessage) {
    responseBody.newMessage = newMessage;
  }

  console.log(responseBody);

  return {
    statusCode,
    body: JSON.stringify(responseBody),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

module.exports = sendResponseToClient;
