// handlers/registerUser.js
"use strict";

const docClient = require("../utils/dbClient"); // Import the DocumentClient
const { v4: uuidv4 } = require("uuid"); // For generating unique IDs
const bcrypt = require("bcryptjs"); // Use bcryptjs for password hashing
const formatDate = require("../utils/formatDate");
const {
  validateUsername,
  validateEmail,
} = require("./utils/nameAndEmailFormatValidation");

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

  // Validate username and email formats
  try {
    validateUsername(username);
    validateEmail(email);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }

  // Check for existing users using the Global Secondary Indexes
  const usernameParams = {
    TableName: "UsersTable",
    IndexName: "pk-username-index", // Specify the GSI for username
    KeyConditionExpression: "pk = :pk and username = :username",
    ExpressionAttributeValues: {
      ":pk": "user",
      ":username": username,
    },
  };

  const emailParams = {
    TableName: "UsersTable",
    IndexName: "pk-email-index", // Specify the GSI for email
    KeyConditionExpression: "pk = :pk and email = :email",
    ExpressionAttributeValues: {
      ":pk": "user",
      ":email": email,
    },
  };

  try {
    const existingUsername = await docClient.query(usernameParams).promise();
    const existingEmail = await docClient.query(emailParams).promise();

    // Check for duplicates
    if (existingUsername.Items.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Username is taken",
        }),
      };
    }

    // Check for duplicates
    if (existingEmail.Items.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Email is taken",
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
        createdAt: Date.now(),
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
        createdAt: formatDate(newUserParams.Item.createdAt),
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
