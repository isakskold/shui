// utils/jwtUtil.js

const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");

const secretsManager = new AWS.SecretsManager();

async function generateTokens(username) {
  // Changed parameter to username
  try {
    // Retrieve the JWT secret from Secrets Manager
    const secretData = await secretsManager
      .getSecretValue({ SecretId: "JwtSecret" })
      .promise();
    const secret = JSON.parse(secretData.SecretString).JWT_SECRET_KEY;

    // Retrieve the refresh secret from Secrets Manager
    const refreshSecretData = await secretsManager
      .getSecretValue({ SecretId: "RefreshJwtSecret" })
      .promise();
    const refreshSecret = JSON.parse(
      refreshSecretData.SecretString
    ).JWT_REFRESH_SECRET_KEY;

    // Generate JWT token
    const accessToken = jwt.sign({ username }, secret, { expiresIn: "1h" }); // Changed id to username

    // Generate refresh token
    const refreshToken = jwt.sign({ username }, refreshSecret, {
      expiresIn: "7d",
    }); // Changed id to username

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(`Error generating tokens: ${error.message}`);
    throw new Error("Token generation failed");
  }
}

module.exports = {
  generateTokens,
};
