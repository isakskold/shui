import { fetchAuthSession } from "aws-amplify/auth";
import catchErrorFromBackend from "./catchErrorFromBackend";

export const getSession = async (errorMessage) => {
  try {
    const session = await fetchAuthSession();
    return session;
  } catch (error) {
    error.status = 400;
    throw catchErrorFromBackend(
      error.status,
      errorMessage || "Please login to continue"
    );
  }
};
