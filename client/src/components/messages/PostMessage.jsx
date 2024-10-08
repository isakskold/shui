import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import TextInput from "../utils/TextInput";
import { sendMessage } from "../../api";
import useMessageStore from "../../hooks/useMessageStore";
import { LoadingText, ErrorText } from "./Messages";

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

const PostMessage = () => {
  const textRef = useRef(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const addMessage = useMessageStore((state) => state.addMessage); // Get the addMessage action from the store
  const messages = useMessageStore((state) => state.messages);
  const [errorText, setErrorText] = useState(null);

  const handlePostMessage = async (e) => {
    e.preventDefault();
    const text = textRef.current.value;

    if (text) {
      setIsLoading(true); // Set loading state to true
      try {
        const response = await sendMessage({ text });
        console.log("%c" + response.message, "color: green;");

        // Assuming the response contains the newly created message
        addMessage(response.newMessage); // Update Zustand state with the new message

        textRef.current.value = ""; // Clear the textarea
        setIsFormVisible(false); // Hide the form after posting
      } catch (error) {
        setErrorText(error.message);
        console.log(error);

        console.error("Error posting message:", error.message);
        // Optionally, show an error message to the user
      } finally {
        setIsLoading(false); // Reset loading state
      }
    }
  };

  // Log updated messages whenever the messages state changes
  useEffect(() => {
    console.log("Current messages in store:", messages);
  }, [messages]); // Run this effect whenever messages change

  return (
    <Container>
      <Button onClick={() => setIsFormVisible((prev) => !prev)}>
        Post a message
      </Button>
      {isLoading && <LoadingText>Posting message...</LoadingText>}{" "}
      {errorText !== null && <ErrorText>{errorText}</ErrorText>}
      {isFormVisible && (
        <Form onSubmit={handlePostMessage}>
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
