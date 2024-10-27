import React from "react";
import styled from "styled-components";
import TopicFeed from "./topicFeed/TopicFeed";
import { sampleMessages } from "../../../utils/sampleMessages"; // For testing

const FeedStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4rem; /* Vertical spacing between topic feeds */
  border: 1px solid white;
  height: 100%;
  padding: 10px;
`;

const Feed = () => {
  return (
    <FeedStyled>
      {sampleMessages.map((topic) => (
        <TopicFeed
          key={topic.id}
          topic={topic.title}
          messages={topic.messages}
        />
      ))}
    </FeedStyled>
  );
};

export default Feed;
