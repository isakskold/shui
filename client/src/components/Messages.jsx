// src/Messages.jsx
import React from "react";
import { useMessages } from "../hooks/useMessages";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #333;
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

const Messages = () => {
  const { messages, loading, error } = useMessages();

  if (loading) {
    return <p>Loading messages...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <Title>Messages</Title>
      <MessageList>
        {messages.map((msg) => (
          <MessageItem key={msg.id}>
            <Username>{msg.username}:</Username> {msg.text}{" "}
            <Timestamp>({msg.createdAt})</Timestamp>
          </MessageItem>
        ))}
      </MessageList>
    </Container>
  );
};

export default Messages;
