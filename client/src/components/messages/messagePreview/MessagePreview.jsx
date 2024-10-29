import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useNavigateMessageStore from "../../../hooks/useNavigateMessage";

const PostPreviewStyled = styled.article`
  border: 1px solid white;
  flex-grow: 1;
  font-size: 1.5rem; // Message title font
  padding: 5px;
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(2, 1fr); // Two equal columns for the first row
  grid-template-rows: auto; // Adjust row height automatically based on content
  gap: 10px; // Optional: Space between items
`;

const PostTitleStyled = styled.h3`
  font-size: 2rem;
  grid-column: span 1;
`;

const PostedByStyled = styled.p`
  grid-column: span 1;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const PostContentPreviewStyled = styled.p`
  font-size: 1rem;
  height: 5rem;
  overflow: hidden;
  grid-column: span 2;
`;

const MessagePreview = ({ id, title, text, username }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const messageToStore = { id, title, text, username }; // Replace with actual message data
    useNavigateMessageStore.getState().setMessage(messageToStore); // Set the message

    navigate(`/message/${id}`); // Navigate to /message/:id
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick();
    }
  };

  return (
    <PostPreviewStyled
      role="button"
      tabIndex="0"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <PostTitleStyled>{title}</PostTitleStyled>
      <PostedByStyled>Posted by: {username}</PostedByStyled>
      <PostContentPreviewStyled>{text}</PostContentPreviewStyled>
    </PostPreviewStyled>
  );
};

export default MessagePreview;
