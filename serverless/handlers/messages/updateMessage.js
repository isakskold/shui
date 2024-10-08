"use strict";

const docClient = require("../utils/dbClient");
const formatDate = require("../utils/formatDate");
const verifyToken = require("../utils/verifyToken");
const sendResponseToClient = require("../utils/sendResponseToClient");

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const requestBody = JSON.parse(event.body);
  const { text } = requestBody;

  if (!text) {
    return sendResponseToClient(400, "Text is required for updating a message");
  }

  const allowedFields = ["text"];
  if (Object.keys(requestBody).some((key) => !allowedFields.includes(key))) {
    return sendResponseToClient(
      400,
      "Invalid fields in request body. Only 'text' is allowed"
    );
  }

  // Check if the item exists
  const getParams = {
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

  console.log(`Token: ${token}`);

  try {
    const decoded = await verifyToken(token);

    // Extract userId and username from decoded token
    const userId = decoded.sub; // User ID from token

    const getResult = await docClient.get(getParams).promise();
    if (!getResult.Item) {
      return sendResponseToClient(
        404,
        "Message not found with the provided ID"
      );
    }

    if (getResult.Item.userId !== userId) {
      return sendResponseToClient(
        403,
        "You are not authorized to update this message"
      );
    }

    // Proceed with the update if the item exists
    const updateParams = {
      TableName: "MessagesTable",
      Key: {
        pk: "messages",
        id,
      },
      UpdateExpression: "set #text = :text",
      ExpressionAttributeNames: {
        "#text": "text",
      },
      ExpressionAttributeValues: {
        ":text": text,
      },
      ReturnValues: "ALL_NEW",
    };

    const data = await docClient.update(updateParams).promise();

    const newMessage = {
      id, // Return the ID for reference
      username: getResult.Item.username, // Include the username from the original item
      text: data.Attributes.text, // The updated text
      createdAt: formatDate(getResult.Item.createdAt), // Include the original creation timestamp
    };
    // Return the updated message details
    return sendResponseToClient(
      200,
      "Message updated successfully",
      newMessage
    );
  } catch (err) {
    return sendResponseToClient(500, "Unable to update message");
  }
};
