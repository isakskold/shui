import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PostPreviewStyled = styled.article`
  border: 1px solid white;
  flex-grow: 1;
  font-size: 1.5rem; // Message title font
  padding: 5px;
  cursor: pointer;
`;

const PostContentPreviewStyled = styled.p`
  font-size: 1rem;
  height: 5rem;
  overflow: hidden;
`;

const MessagePreview = ({ id, title, content }) => {
  const navigate = useNavigate();

  const handleClick = () => {
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
      {title}
      <PostContentPreviewStyled>{content}</PostContentPreviewStyled>
    </PostPreviewStyled>
  );
};

export default MessagePreview;
