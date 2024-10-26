import React from "react";
import styled from "styled-components";
import MessagePreview from "../../../../messages/messagePreview/MessagePreview";

const TopicFeedStyled = styled.section`
  width: 100%;
  min-height: 15rem;
  border: white 1px solid;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 10px;
`;

const TopicTitleStyled = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const TopicFeed = ({ topic, messages }) => {
  return (
    <TopicFeedStyled>
      <TopicTitleStyled>{topic}</TopicTitleStyled>
      {messages.map((message, index) => (
        <MessagePreview
          key={index}
          title={message.title}
          content={message.content}
          id={message.id}
        />
      ))}
    </TopicFeedStyled>
  );
};

export default TopicFeed;
