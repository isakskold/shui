"use strict";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const requestBody = JSON.parse(event.body);
  const { text } = requestBody;

  if (!text) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Text is required for updating a message",
      }),
    };
  }

  const getParams = {
    TableName: "MessagesTable",
    Key: {
      pk: "messages", // Constant partition key
      id, // Sort key (message ID)
    },
  };

  const existingMessage = await docClient.get(getParams).promise();
  if (!existingMessage.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Message not found" }),
    };
  }

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
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const data = await docClient.update(updateParams).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data.Attributes),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
