// handlers/registerUser.js
"use strict";

const docClient = require("../utils/dbClient"); // Import the DocumentClient
const { v4: uuidv4 } = require("uuid"); // For generating unique IDs
const bcrypt = require("bcryptjs"); // Use bcryptjs for password hashing
const formatDate = require("../utils/formatDate");

module.exports.handler = async (event) => {
  const requestBody = JSON.parse(event.body);
  const { username, password, confirmPassword, email } = requestBody; // Assuming you need username and password for registration

  // Validate input
  if (!username || !password || !confirmPassword || !email) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Username, email and password are required",
      }),
    };
  }

  if (password !== confirmPassword) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Passwords do not match" }),
    };
  }

  // Check for existing users
  const params = {
    TableName: "UsersTable",
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": "user",
    },
  };

  try {
    const existingUsers = await docClient.query(params).promise();

    // Check for duplicates
    const userExists = existingUsers.Items.find(
      (user) => user.username === username || user.email === email
    );

    if (userExists) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Username or email already exists",
        }),
      };
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const newUserParams = {
      TableName: "UsersTable",
      Item: {
        pk: "user",
        id: uuidv4(),
        username,
        email,
        hashedPassword,
        createdAt: formatDate(Date.now()),
      },
    };

    await docClient.put(newUserParams).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "User registered successfully!",
        id: newUserParams.Item.id,
        username: newUserParams.Item.username,
        email: newUserParams.Item.email,
        createdAt: newUserParams.Item.createdAt,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
