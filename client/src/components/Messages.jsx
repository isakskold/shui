import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import TextInput from "./utils/TextInput";

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

const LoadingText = styled.span`
  font-size: 0.8rem;
  color: #777;
  margin: 0 0.5rem;
`;

const UpdateForm = styled.form`
  margin-top: 0.5rem;
  overflow: hidden;
`;

const Messages = ({ messages, error, removeMessage, modifyMessage }) => {
  const [currentMessageId, setCurrentMessageId] = useState(null);
  const [loadingMessageId, setLoadingMessageId] = useState(null); // Tracks the message being updated
  const [deletingMessageId, setDeletingMessageId] = useState(null); // Tracks the message being deleted
  const textareaRef = useRef(null); // Add this line back

  console.log(messages);

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleDelete = async (id) => {
    setDeletingMessageId(id); // Set the deleting state

    try {
      await removeMessage(id);
    } finally {
      setDeletingMessageId(null); // Reset after deletion
    }
  };

  const handleEdit = (msg) => {
    setCurrentMessageId(msg.id);
    // Use setTimeout to ensure the textarea is rendered before accessing its value
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.value = msg.text; // This will now work correctly
      }
    }, 0);
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    const updatedText = textareaRef.current.value; // Get the value from the textarea
    setLoadingMessageId(currentMessageId); // Set the loading state for the message being updated
    try {
      await modifyMessage(currentMessageId, { text: updatedText });
      setCurrentMessageId(null); // Clear the current message ID after updating
      textareaRef.current.value = ""; // Clear the textarea after submission
    } finally {
      setLoadingMessageId(null); // Reset after update
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
              <Button onClick={() => handleDelete(msg.id)}>Delete</Button>
              {/* Conditionally show loading text for deleting */}
              {deletingMessageId === msg.id && (
                <LoadingText>Deleting...</LoadingText>
              )}
            </MessageActions>
            {/* Conditionally show the edit form inside the MessageItem */}
            {currentMessageId === msg.id && (
              <UpdateForm onSubmit={handleUpdate}>
                <TextInput
                  type="textarea"
                  placeholder=""
                  ref={textareaRef}
                  required
                />
                <Button type="submit">Update Message</Button>
                {/* Conditionally show loading text for updating */}
                {loadingMessageId === msg.id && (
                  <LoadingText>Updating...</LoadingText>
                )}
              </UpdateForm>
            )}
          </MessageItem>
        ))}
      </MessageList>
    </Container>
  );
};

export default Messages;
