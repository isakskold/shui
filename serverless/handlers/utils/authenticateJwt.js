const { verify } = require("jsonwebtoken");

exports.handler = async (event) => {
  const token = event.authorizationToken;

  try {
    const user = verify(token, "your_secret_key"); // Validate the token

    return {
      principalId: user.userId, // The user ID from the token
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: event.methodArn,
          },
        ],
      },
    };
  } catch (error) {
    return {
      principalId: "user", // or return null
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Deny",
            Resource: event.methodArn,
          },
        ],
      },
    };
  }
};
