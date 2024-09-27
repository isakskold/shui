import React, { forwardRef, useEffect, useRef } from "react";
import styled from "styled-components";

// Styled component for input
const StyledInput = styled.input`
  width: 100%; /* Make it responsive */
  min-height: 3rem; /* Minimum height for input */
  height: auto; /* Allow height to adjust */
  padding: 0.5rem; /* Add some padding */
  border: 1px solid #ddd; /* Add border */
  border-radius: 5px; /* Match the button style */
  resize: none; /* Prevent manual resizing */
  overflow: hidden; /* Hide overflow */
  font-size: 1rem; /* Match your font size */

  /* Optional: Add a transition for better UX */
  transition: border-color 0.2s ease;

  &:focus {
    border-color: var(--primary-blue); /* Highlight on focus */
    outline: none; /* Remove default outline */
  }
`;

// Styled component for textarea
const StyledTextarea = styled.textarea`
  width: 100%; /* Make it responsive */
  min-height: 5rem; /* Minimum height for textarea */
  height: auto; /* Allow height to adjust */
  padding: 0.5rem; /* Add some padding */
  border: 1px solid #ddd; /* Add border */
  border-radius: 5px; /* Match the button style */
  resize: none; /* Prevent manual resizing */
  overflow: hidden; /* Hide overflow */
  font-size: 1rem; /* Match your font size */

  /* Optional: Add a transition for better UX */
  transition: border-color 0.2s ease;

  &:focus {
    border-color: var(--primary-blue); /* Highlight on focus */
    outline: none; /* Remove default outline */
  }
`;

const TextInput = forwardRef(
  ({ type = "text", value, placeholder, required, onChange }, ref) => {
    // Function to handle textarea resize
    const handleResize = (e) => {
      ref.current.style.height = "auto"; // Reset height
      ref.current.style.height = `${ref.current.scrollHeight}px`; // Set to scrollHeight
    };

    return type === "textarea" ? (
      <StyledTextarea
        placeholder={placeholder}
        value={value}
        required={required}
        ref={ref}
        onChange={handleResize} // Handle resize on change
      />
    ) : (
      <StyledInput
        placeholder={placeholder}
        value={value}
        required={required}
        ref={ref}
      />
    );
  }
);

// Display name for easier debugging
TextInput.displayName = "TextInput";

export default TextInput;
