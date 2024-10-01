const AWS = require("aws-sdk");
const { verify } = require("jsonwebtoken");
const secretsManager = new AWS.SecretsManager();

exports.handler = async (event) => {
  try {
    console.log(`Event: ${JSON.stringify(event)}`);

    const token =
      event.headers["Authorization"] || event.headers["authorization"];
    console.log(`Received token: ${token}`); // Log the received token

    const apiKey = event.headers["x-api-key"]; // Get API key from headers
    const validApiKey = "CXidL9JnMm9oMNhipr1IGa7XuuV6YpDd1v1pSEh7";

    // Validate API key
    console.log(`Received API key: ${apiKey}`); // Log the received API key
    if (apiKey !== validApiKey) {
      console.log(`Invalid API key: ${apiKey}`); // Log if the API key is invalid
      return {
        principalId: "user",
        policyDocument: {
          Version: "2012-10-17",
          Statement: [
            {
              Action: "execute-api:Invoke",
              Effect: "Deny",
              Resource: event.routeArn,
            },
          ],
        },
      };
    }

    // Retrieve secret for JWT validation
    const secretData = await secretsManager
      .getSecretValue({ SecretId: "JwtSecret" })
      .promise();
    const secret = JSON.parse(secretData.SecretString).JWT_SECRET_KEY;
    console.log(`Retrieved secret: ${secret}`);

    const user = verify(token, secret); // Validate the token
    console.log(`User from token: ${JSON.stringify(user)}`);

    const policy = {
      principalId: user.username, // Use username here
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: event.routeArn,
          },
        ],
      },
    };
    console.log(`Policy Document: ${JSON.stringify(policy)}`);

    return policy;
  } catch (error) {
    console.error(`Error in authorizer: ${error.message}`);
    return {
      principalId: "user", // or return null
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Deny",
            Resource: event.routeArn,
          },
        ],
      },
    };
  }
};
