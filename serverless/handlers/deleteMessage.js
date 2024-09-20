"use strict";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;

  const getParams = {
    TableName: "MessagesTable",
    Key: {
      pk: "messages",
      id,
    },
  };

  const existingMessage = await docClient.get(getParams).promise();
  if (!existingMessage.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Message not found" }),
    };
  }

  const deleteParams = {
    TableName: "MessagesTable",
    Key: {
      pk: "messages",
      id,
    },
  };

  try {
    await docClient.delete(deleteParams).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Message deleted successfully" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
