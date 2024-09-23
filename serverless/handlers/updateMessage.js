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

  const allowedFields = ["text"];
  if (Object.keys(requestBody).some((key) => !allowedFields.includes(key))) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Invalid fields in request body. Only 'text' is allowed.",
      }),
    };
  }

  // Check if the item exists
  const getParams = {
    TableName: "MessagesTable",
    Key: {
      pk: "messages",
      id,
    },
  };

  try {
    const getResult = await docClient.get(getParams).promise();
    if (!getResult.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "Message not found with the provided ID",
        }),
      };
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
      ReturnValues: "UPDATED_NEW",
    };

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
