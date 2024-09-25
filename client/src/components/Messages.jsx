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
  list-style-type: none;
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
  color: #007bff;
`;

const Timestamp = styled.em`
  color: #777;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Messages = ({
  messages,
  loading,
  error,
  removeMessage,
  modifyMessage,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState(null);
  const [updatedText, setUpdatedText] = useState("");

  if (loading) {
    return <p>Loading messages...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleDelete = (id) => {
    removeMessage(id);
  };

  const handleEdit = (msg) => {
    setEditMode(true);
    setCurrentMessageId(msg.id);
    setUpdatedText(msg.text);
  };

  const handleUpdate = () => {
    modifyMessage(currentMessageId, { text: updatedText });
    setEditMode(false);
    setCurrentMessageId(null);
    setUpdatedText("");
  };

  return (
    <Container>
      <MessageList>
        {messages.map((msg) => (
          <MessageItem key={msg.id}>
            <Username>{msg.username}:</Username> {msg.text}{" "}
            <Timestamp>({msg.createdAt})</Timestamp>
            <Button onClick={() => handleEdit(msg)}>Edit</Button>
            <Button onClick={() => handleDelete(msg.id)}>Delete</Button>
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
