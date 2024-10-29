import React from "react";
import styled from "styled-components";

const MessageExpandedStyled = styled.article`
  border: 1px solid white;
  flex-grow: 1;
  font-size: 1.5rem; // Message title font
  padding: 5px;
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

const PostContentExpandedStyled = styled.p`
  font-size: 1rem;
  grid-column: span 2;
`;

const MessageExpanded = ({ title, content, username }) => {
  return (
    <MessageExpandedStyled>
      <PostTitleStyled>{title}</PostTitleStyled>
      <PostedByStyled>Posted by: {username}</PostedByStyled>
      <PostContentExpandedStyled>{content}</PostContentExpandedStyled>
    </MessageExpandedStyled>
  );
};

export default MessageExpanded;
