"use strict";

const jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");
const secretsManager = new AWS.SecretsManager();
const { generateTokens } = require("../utils/jwtUtil");

exports.handler = async (event) => {
  const { refreshToken } = JSON.parse(event.body);

  if (!refreshToken) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Refresh token is required." }),
    };
  }

  try {
    // Get refresh secret from Secrets Manager
    const secretData = await secretsManager
      .getSecretValue({ SecretId: "RefreshJwtSecret" })
      .promise();
    const refreshSecret = JSON.parse(
      secretData.SecretString
    ).JWT_REFRESH_SECRET_KEY;

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, refreshSecret);

    // If valid, generate new access token
    const { accessToken } = await generateTokens(decoded.username);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Token refreshed successfully",
        accessToken,
      }),
    };
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: "Invalid refresh token",
        error: error.message,
      }),
    };
  }
};
