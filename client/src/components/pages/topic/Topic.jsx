import React from "react";
import PostMessage from "./postMessage/postMessage";
import TopicFeed from "./topicFeed/topicFeed";
import PageWrapper from "../../utils/PageWrapper";
import { useParams } from "react-router-dom";

const allowedTopics = ["frontend", "backend", "general"];

const Topic = () => {
  const { topic } = useParams();

  // Validate the topic
  if (!allowedTopics.includes(topic)) {
    return (
      <PageWrapper>
        <p>Invalid topic</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PostMessage />
      <TopicFeed />
    </PageWrapper>
  );
};

export default Topic;
