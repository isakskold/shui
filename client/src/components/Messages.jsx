import React, { useState } from "react";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
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
`;

const Messages = ({ messages, error, removeMessage, modifyMessage }) => {
  const [editMode, setEditMode] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [loadingMessageId, setLoadingMessageId] = useState(null); // Tracks the message being updated
  const [deletingMessageId, setDeletingMessageId] = useState(null); // Tracks the message being deleted

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
    setEditMode(true);
    setCurrentMessageId(msg.id);
    setUpdatedText(msg.text);
  };

  const handleUpdate = async () => {
    setLoadingMessageId(currentMessageId); // Set the loading state for the message being updated
    try {
      await modifyMessage(currentMessageId, { text: updatedText });
      setEditMode(false);
      setCurrentMessageId(null);
      setUpdatedText("");
    } finally {
      setLoadingMessageId(null); // Reset after update
    }
  };

  return (
    <Container>
      <MessageList>
        {messages.map((msg) => (
          <MessageItem key={msg.id}>
            <Username>{msg.username}:</Username> {msg.text}{" "}
            <Timestamp>({msg.createdAt})</Timestamp>
            <MessageActions>
              <Button onClick={() => handleEdit(msg)}>Edit</Button>
              <Button onClick={() => handleDelete(msg.id)}>Delete</Button>
              {/* Conditionally show loading text for deleting and updating */}
              {loadingMessageId === msg.id && (
                <LoadingText>Updating...</LoadingText>
              )}
              {deletingMessageId === msg.id && (
                <LoadingText>Deleting...</LoadingText>
              )}
            </MessageActions>
          </MessageItem>
        ))}
      </MessageList>
      {editMode && (
        <div>
          <input
            type="text"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
          <Button onClick={handleUpdate}>Update Message</Button>
        </div>
      )}
    </Container>
  );
};

export default Messages;
