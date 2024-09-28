"use strict";

const docClient = require("../utils/dbClient");
const formatDate = require("../utils/formatDate");

module.exports.handler = async () => {
  const params = {
    TableName: "MessagesTable",
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": "messages", // Constant partition key
    },
  };

  try {
    const data = await docClient.query(params).promise();
    if (data.Items.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "No messages posted yet." }),
      };
    }

    // Sort messages manually based on createdAt in descending order
    const sortedMessages = data.Items.sort((a, b) => b.createdAt - a.createdAt);

    // Map over the items to extract relevant fields
    const successResponse = sortedMessages.map((item) => ({
      username: item.username,
      text: item.text,
      createdAt: formatDate(item.createdAt),
      id: item.id,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ messages: successResponse }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
