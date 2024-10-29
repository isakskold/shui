// Utility function to send response to the client
// Include Content as an argument in postMessage handler to return the new message to frontend directly
const sendResponseToClient = (statusCode, message, content = null) => {
  // Create the response body object
  const responseBody = {
    message,
  };

  // Include Content conditionally
  if (content) {
    responseBody.content = content;
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
