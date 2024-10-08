"use strict";

const docClient = require("../utils/dbClient");
const verifyToken = require("../utils/verifyToken");
const sendResponseToClient = require("../utils/sendResponseToClient");

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;
  console.log("ID:", id);

  const params = {
    TableName: "MessagesTable",
    Key: {
      pk: "messages",
      id,
    },
  };

  const authHeader = event.headers.authorization; // Get the Authorization header

  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null; // Extract token

  try {
    const decoded = await verifyToken(token);
    // Extract userId and username from decoded token
    const userId = decoded.sub; // User ID from token

    // Fetch the message to verify the userId matches
    const result = await docClient.get(params).promise();
    if (!result.Item) {
      return sendResponseToClient(404, "Message not found");
    }

    // Check if the logged-in user is the owner of the message
    if (result.Item.userId !== userId) {
      return sendResponseToClient(
        403,
        "You are not allowed to delete this message!"
      );
    }

    // Delete the message if the checks pass
    await docClient.delete(params).promise();
    return sendResponseToClient(200, "Message deleted successfully");
  } catch (err) {
    console.error(err);

    return sendResponseToClient(500, "Unable to delete message.");
  }
};
