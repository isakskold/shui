"use strict";

const docClient = require("../utils/dbClient");
const bcrypt = require("bcryptjs"); // Ensure you have bcryptjs installed
const { generateTokens } = require("./utils/generateJwt"); // Import the function

exports.handler = async (event) => {
  const { username, password } = JSON.parse(event.body);

  // Check if required fields are provided
  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Username and password are required." }),
    };
  }

  // Ensure no other fields are included
  const allowedFields = ["username", "password"];
  const receivedFields = Object.keys(JSON.parse(event.body));

  for (const field of receivedFields) {
    if (!allowedFields.includes(field)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `Field '${field}' is not allowed.` }),
      };
    }
  }

  // Query user from DynamoDB using the Global Secondary Index
  const params = {
    TableName: "UsersTable",
    IndexName: "pk-username-index", // Specify the GSI name
    KeyConditionExpression: "pk = :pk and username = :username", // Condition for GSI
    ExpressionAttributeValues: {
      ":pk": "user", // The primary key value
      ":username": username, // The username to query
    },
  };

  try {
    const data = await docClient.query(params).promise();

    // Check if any user is returned
    if (data.Items.length === 0) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid credentials" }),
      };
    }

    const user = data.Items[0]; // Get the first item from the results
    console.log("Retrieved user data:", user);

    // Check if password matches
    if (bcrypt.compareSync(password, user.hashedPassword)) {
      const { accessToken, refreshToken } = await generateTokens(username);

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Login successful",
          accessToken,
          refreshToken,
        }),
      };
    }

    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Invalid credentials" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error logging in",
        error: error.message,
      }),
    };
  }
};
