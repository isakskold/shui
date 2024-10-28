import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MessagePreview from "../../../messages/messagePreview/MessagePreview";
import { useParams } from "react-router-dom";
import { fetchMessagesByTopic } from "../../../../api/fetchMessageByTopic";

const TopicFeedStyled = styled.section`
  border: 1px solid white;
  display: flex;
  flex-direction: column;
`;

const TopicFeed = () => {
  const { topic } = useParams();
  const [fetchedMessages, setFetchedMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emptyMessage, setEmptyMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await fetchMessagesByTopic(topic);
        console.log(messages);
        if (messages.message) {
          // Check if the response indicates no messages
          setEmptyMessage(messages.message); // Set the empty message
          setFetchedMessages([]); // Clear fetched messages
        } else {
          setFetchedMessages(messages.messages); // Set fetched messages
          setEmptyMessage(null); // Clear empty message if there are messages
        }
      } catch (error) {
        console.error(`Error details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [topic]);

  useEffect(() => {
    console.log(fetchedMessages); // This will log the updated messages after the state changes
  }, [fetchedMessages]);

  if (loading) return <p>Loading messages...</p>;

  return (
    <TopicFeedStyled>
      {emptyMessage ? ( // Check if there is an empty message to display
        <p>{emptyMessage}</p>
      ) : (
        fetchedMessages.map((message) => (
          <MessagePreview
            key={message.id}
            id={message.id}
            title={message.title}
            content={message.text}
            username={message.username}
          />
        ))
      )}
    </TopicFeedStyled>
  );
};

export default TopicFeed;
