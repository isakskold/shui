import { useEffect } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react"; // Import the HOC
import "@aws-amplify/ui-react/styles.css";
import { useNavigate } from "react-router-dom";

// If loggin in redirect to "/" default route. If not logged in, redirect to "/login" route.
// When a user signs up or logs in through the Amplify UI the useEffect will run.

const AuthComponent = () => {
  const navigate = useNavigate(); // Create navigate instance

  useEffect(() => {
    navigate("/"); // Navigate to the home page after authentication
  }, [navigate]); // Dependency array ensures this runs once

  return null;
};

// Wrap the component with withAuthenticator HOC
export default withAuthenticator(AuthComponent);
