"use strict";

const docClient = require("../utils/dbClient");
const formatDate = require("../utils/formatDate");
const sendResponseToClient = require("../utils/sendResponseToClient");

module.exports.handler = async (event) => {
  const { id } = event.pathParameters; // Get the 'id' from query parameters

  const params = {
    TableName: "MessagesTable",
    KeyConditionExpression: "pk = :pk AND id = :id", // Adjusted to include sort key
    ExpressionAttributeValues: {
      ":pk": "messages", // Constant partition key
      ":id": id, // The ID of the message to fetch
    },
  };

  try {
    const data = await docClient.query(params).promise();
    if (data.Items.length === 0) {
      return sendResponseToClient(404, "Message not found");
    }

    // Since we're fetching one message, we can directly access the first item
    const item = data.Items[0];

    // Map over the item to extract relevant fields
    const successResponse = {
      username: item.username,
      text: item.text,
      createdAt: formatDate(item.createdAt),
      id: item.id,
      title: item.title,
    };

    return sendResponseToClient(
      200,
      "Message fetched successfully",
      successResponse
    );
  } catch (err) {
    console.error(`Error fetching message with ID ${id}: ${err}`);
    return sendResponseToClient(500, "Internal server error");
  }
};
