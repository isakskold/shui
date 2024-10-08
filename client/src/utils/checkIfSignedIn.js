import { getCurrentUser } from "aws-amplify/auth";

export const checkAuthStatus = async () => {
  try {
    const user = await getCurrentUser();
    console.log("User is logged in:", user);
    return user; // User is logged in
  } catch (error) {
    console.log("No user is logged in.");
    return null; // User is not logged in or an error occurred
  }
};
