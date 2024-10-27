import React from "react";
import styled from "styled-components";

const MessageExpandedStyled = styled.article`
  border: 1px solid white;
  font-size: 1.5rem;
  padding: 5px;
`;

const MessageContentExpandedStyled = styled.p`
  font-size: 1rem;
`;

const MessageExpanded = ({ title, content }) => {
  return (
    <MessageExpandedStyled>
      {title}
      <MessageContentExpandedStyled>{content}</MessageContentExpandedStyled>
    </MessageExpandedStyled>
  );
};

export default MessageExpanded;
