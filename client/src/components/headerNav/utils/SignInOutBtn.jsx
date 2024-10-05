import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GenericButton from "../../utils/GenericButton";
import useAuthStore from "../../../hooks/useAuthStore";

const SignInSignOutButton = () => {
  const { user, checkAuthStatus, signOutUser } = useAuthStore(); // Access Zustand state and functions
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus(); // Check the current user's auth status on mount
  }, [checkAuthStatus]);

  const handleClick = async () => {
    if (user) {
      await signOutUser(); // Sign out user
    } else {
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <GenericButton
      label={user ? "Sign Out" : "Sign In"}
      onClick={handleClick}
    />
  );
};

export default SignInSignOutButton;
