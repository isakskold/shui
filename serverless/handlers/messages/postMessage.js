"use strict";

const docClient = require("../utils/dbClient");
const { v4: uuidv4 } = require("uuid"); // For generating unique IDs
const formatDate = require("../utils/formatDate");
const verifyToken = require("../utils/verifyToken");
const sendResponseToClient = require("../utils/sendResponseToClient");

module.exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body);
  console.log("Request Body:", requestBody);
  const { title, text } = requestBody; // Text content
  // Extract userId and username from the authorizer claims

  const authHeader = event.headers.authorization; // Get the Authorization header

  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null; // Extract token

  console.log(`Token: ${token}`);

  try {
    const decoded = await verifyToken(token);

    // Extract userId and username from decoded token
    const userId = decoded.sub; // User ID from token
    const username = decoded.username;
    const messageId = uuidv4(); // Unique sort key (ID)
    const { topic } = event.queryStringParameters;

    // Check if the topic is valid
    if (!["frontend", "backend", "general"].includes(topic)) {
      return sendResponseToClient(400, "Invalid topic provided");
    }

    const params = {
      TableName: "MessagesTable",
      Item: {
        pk: "messages", // Constant partition key
        id: messageId,
        username, // Username from the request body
        userId,
        title,
        text, // Message text
        topic,
        createdAt: Date.now(), // Timestamp when the message was created
      },
    };

    await docClient.put(params).promise();

    // Create a message object to return
    const newMessage = {
      id: messageId,
      username,
      title,
      text,
      createdAt: formatDate(Date.now()), // Format date if needed
      userId,
    };

    return sendResponseToClient(201, "Message posted successfully", newMessage);
  } catch (err) {
    console.error("Error details:", err);
    return sendResponseToClient(500, "Unable to post message");
  }
};
