import React, { useState, useRef } from "react";
import styled from "styled-components";
import TextInput from "./utils/TextInput";

// Styled components
const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: var(--primary-blue);
  color: white;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-blue-hover);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const LoadingText = styled.span`
  font-size: 0.8rem;
  color: #777;
  margin: 0 0.5rem;
`;

const PostMessage = ({ postMessage }) => {
  const usernameRef = useRef(null);
  const textRef = useRef(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const handlePostMessage = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const text = textRef.current.value;

    if (username && text) {
      setIsLoading(true); // Set loading state to true
      await postMessage({ username, text }); // Assuming postMessage is a promise
      usernameRef.current.value = ""; // Clear the input field
      textRef.current.value = ""; // Clear the textarea
      setIsFormVisible(false); // Hide the form after posting
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <Container>
      <Button onClick={() => setIsFormVisible((prev) => !prev)}>
        Post a message
      </Button>
      {isLoading && <LoadingText>Posting message...</LoadingText>}{" "}
      {/* Show loading text */}
      {isFormVisible && (
        <Form onSubmit={handlePostMessage}>
          <TextInput
            ref={usernameRef} // Assign the ref
            type="text"
            placeholder="Username"
            required
          />
          <TextInput
            ref={textRef} // Assign the ref
            type="textarea"
            placeholder="Your message"
            required
          />
          <Button type="submit">Publish message</Button>
        </Form>
      )}
    </Container>
  );
};

export default PostMessage;
