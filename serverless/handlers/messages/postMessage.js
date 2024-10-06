"use strict";

const docClient = require("../utils/dbClient");
const { v4: uuidv4 } = require("uuid"); // For generating unique IDs
const formatDate = require("../utils/formatDate");

module.exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body);
  const { username, userId, text } = requestBody;

  if (!username || !text || !userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Username, userId and text are required" }),
    };
  }

  const params = {
    TableName: "MessagesTable",
    Item: {
      pk: "messages", // Constant partition key
      id: uuidv4(), // Unique sort key (ID)
      username, // Username from the request body
      userId,
      text, // Message text
      createdAt: Date.now(), // Timestamp when the message was created
    },
  };

  try {
    await docClient.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({
        id: params.Item.id,
        username: params.Item.username,
        userId: params.Item.userId,
        text: params.Item.text,
        createdAt: formatDate(params.Item.createdAt),
      }), // Return the created item
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
