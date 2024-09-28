// utils/validators.js

// Validate username (only allow A-Z, a-z, and 0-9)
const validateUsername = (username) => {
  const usernameRegex = /^[A-Za-z0-9]+$/;
  if (!usernameRegex.test(username)) {
    throw new Error("Username can only contain letters and numbers.");
  }
};

// Validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format.");
  }
};

// Export the validation functions
module.exports = {
  validateUsername,
  validateEmail,
};
