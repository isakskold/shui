const AWS = require("aws-sdk");
const secretsManager = new AWS.SecretsManager();
const { v4: uuidv4 } = require("uuid"); // To generate UUIDs

exports.handler = async (event) => {
  const secretId = event.SecretId; // The ID of the secret

  // Generate new unique keys
  const newJwtSecretKey = uuidv4();
  const newRefreshSecretKey = uuidv4();

  const params = {
    SecretId: secretId,
    SecretString: JSON.stringify({
      JWT_SECRET_KEY: newJwtSecretKey,
      JWT_REFRESH_SECRET_KEY: newRefreshSecretKey,
      // Add any other keys/values you want to update
    }),
  };

  try {
    await secretsManager.putSecretValue(params).promise();
    console.log(`Successfully rotated secret: ${secretId}`);
  } catch (error) {
    console.error(`Error rotating secret: ${error.message}`);
    throw error; // Ensure any errors are propagated
  }
};
