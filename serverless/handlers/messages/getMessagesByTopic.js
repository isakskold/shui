"use strict";

const docClient = require("../utils/dbClient");
const formatDate = require("../utils/formatDate");

module.exports.handler = async (event) => {
  try {
    const { topic } = event.queryStringParameters;
    const params = {
      TableName: "MessagesTable",
      IndexName: "TopicCreatedAtIndex",
      KeyConditionExpression: "topic = :topic",
      ExpressionAttributeValues: {
        ":topic": topic,
      },
      Limit: 10, // Get only the latest 10 messages
      ScanIndexForward: false, // Sort in descending order by createdAt
    };

    const data = await docClient.query(params).promise();
    if (data.Items.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "No messages posted yet." }),
      };
    }

    // Map over the items to extract relevant fields
    const successResponse = data.Items.map((item) => ({
      username: item.username,
      title: item.title,
      text: item.text,
      createdAt: formatDate(item.createdAt),
      id: item.id,
      topic: item.topic,
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
