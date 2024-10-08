import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import TextInput from "../utils/TextInput";
import { deleteMessage, updateMessage } from "../../api";
import useMessageStore from "../../hooks/useMessageStore"; // Import the store

// Styled components
const Container = styled.div`
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const MessageList = styled.ul`
  padding: 0;
`;

const MessageItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
`;

const MessageText = styled.p``;

const Username = styled.strong`
  color: var(--primary-blue);
`;

const Timestamp = styled.em`
  color: #777;
  display: block;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  font-size: 0.8rem;
  border-radius: 5px;
  background-color: var(--primary-blue);
  color: white;
  cursor: pointer;
  &:hover {
    background-color: var(--primary-blue-hover);
  }
`;

const MessageActions = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

export const LoadingText = styled.span`
  font-size: 0.8rem;
  color: #777;
  margin: 0 0.5rem;
`;

export const ErrorText = styled.aside`
  font-size: 1rem;
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0 0.2rem;
  border-radius: 5px;
  color: red;
`;

const UpdateForm = styled.form`
  margin-top: 0.5rem;
  overflow: hidden;
`;

const Messages = () => {
  const {
    messages,
    loading,
    fetchMessages,
    deleteMessage: removeMessage,
    updateMessage: editMessage,
  } = useMessageStore(); // Destructure from store
  const [currentMessageId, setCurrentMessageId] = useState(null);
  const [loadingMessageId, setLoadingMessageId] = useState(null);
  const [loadingText, setLoadingText] = useState(null);
  const [errorMessageId, setErrorMessageId] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const textareaRef = useRef(null);

  // Fetch messages when the component mounts
  useEffect(() => {
    const fetchMessagesWithErrorHandling = async () => {
      try {
        console.log("Fetching messages...");

        await fetchMessages(); // Await the async fetchMessages function
      } catch (error) {
        console.error("Error fetching messages:", error.message);
        // Optionally display an error message to the user
      }
    };

    fetchMessagesWithErrorHandling(); // Call the async function
  }, [fetchMessages]);

  const handleDelete = async (msg) => {
    try {
      setLoadingMessageId(msg.id);
      setLoadingText("Deleting...");
      const response = await deleteMessage(msg.id); // Call your API to delete
      console.log("%c" + response.message, "color: green;");
      removeMessage(msg.id); // Update Zustand state
    } catch (error) {
      //Display error message to user
      setErrorMessageId(msg.id);
      setErrorText(error.message);

      console.error("Error deleting message:", error.message);
    } finally {
      setLoadingText(null);
      setLoadingMessageId(null);
    }
  };

  const handleEdit = (msg) => {
    // Click on update button
    setCurrentMessageId(msg.id);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.value = msg.text;
      }
    }, 0);
  };

  const handleUpdate = async (e) => {
    // Submit updated text
    e.preventDefault();
    const updatedText = textareaRef.current.value;
    setLoadingMessageId(currentMessageId);
    setLoadingText("Updating...");

    try {
      const response = await updateMessage(currentMessageId, {
        text: updatedText,
      }); // Call your API to update
      console.log("%c" + response.message, "color: green;");
      editMessage(currentMessageId, updatedText); // Update Zustand state
      setCurrentMessageId(null);
      textareaRef.current.value = "";
    } catch (error) {
      //Display error message to user
      setErrorMessageId(currentMessageId);
      setErrorText(error.message);
      console.error("Error updating message:", error.message);
    } finally {
      setLoadingMessageId(null);
      setLoadingText(null);
    }
  };

  return (
    <Container>
      <MessageList>
        {messages.map((msg) => (
          <MessageItem key={msg.id}>
            <Username>{msg.username}:</Username>
            <MessageText>{msg.text}</MessageText>
            <Timestamp>({msg.createdAt})</Timestamp>
            <MessageActions>
              <Button onClick={() => handleEdit(msg)}>Edit</Button>
              <Button onClick={() => handleDelete(msg)}>Delete</Button>

              {/* Conditional renders for loading and error text */}
              {loadingMessageId === msg.id && (
                <LoadingText>{loadingText}</LoadingText>
              )}
              {errorMessageId === msg.id && <ErrorText>{errorText}</ErrorText>}
            </MessageActions>
            {currentMessageId === msg.id && (
              <UpdateForm onSubmit={handleUpdate}>
                <TextInput
                  type="textarea"
                  placeholder=""
                  ref={textareaRef}
                  required
                />
                <Button type="submit">Update Message</Button>
              </UpdateForm>
            )}
          </MessageItem>
        ))}
      </MessageList>
    </Container>
  );
};

export default Messages;
