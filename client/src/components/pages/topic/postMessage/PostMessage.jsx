import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import TextInput from "../../../utils/TextInput";
import { sendMessage } from "../../../../api/api";
import useMessageStore from "../../../../hooks/useMessageStore";
import { LoadingText, ErrorText } from "../../../messages/Messages";
import { useParams } from "react-router-dom";

// Styled Components
const PostMessageStyled = styled.div`
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
  const { topic } = useParams();
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const addMessage = useMessageStore((state) => state.addMessage);
  const messages = useMessageStore((state) => state.messages);
  const [errorText, setErrorText] = useState(null);

  const handlePostMessage = async (e) => {
    e.preventDefault();
    const text = textRef.current.value;
    const title = titleRef.current.value;

    if (errorText !== null) {
      setErrorText(null);
    }

    if (text && title) {
      setIsLoading(true);
      try {
        const response = await sendMessage({ title, text }, topic);
        console.log("%c" + response.message, "color: green;");

        addMessage(response.newMessage); // Add new message to store
        titleRef.current.value = "";
        textRef.current.value = ""; // Clear input
        setIsFormVisible(false); // Hide form after posting
      } catch (error) {
        setErrorText(error.message);
        console.error("Error posting message:", error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Log updated messages whenever the messages state changes
  useEffect(() => {
    console.log("Current messages in store:", messages);
  }, [messages]);

  return (
    <PostMessageStyled>
      <Button onClick={() => setIsFormVisible((prev) => !prev)}>
        Post a message
      </Button>
      {isLoading && <LoadingText>Posting message...</LoadingText>}
      {errorText && <ErrorText>{errorText}</ErrorText>}
      {isFormVisible && (
        <Form onSubmit={handlePostMessage}>
          <TextInput
            ref={titleRef} // A new ref for title input if needed
            type="text" // Render as single-line input
            placeholder="Message title..."
            required
          />
          <TextInput
            ref={textRef}
            type="textarea"
            placeholder="Your message..."
            required
          />
          <Button type="submit">Publish message</Button>
        </Form>
      )}
    </PostMessageStyled>
  );
};

export default PostMessage;
