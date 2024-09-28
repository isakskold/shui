"use strict";

const docClient = require("../utils/dbClient");

module.exports.handler = async (event) => {
  const { id } = event.pathParameters;

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

//This code assumes the frontend makes sure to get the id from the response in getAllMessages. No scenario for invalid id or blank id should be possible.
