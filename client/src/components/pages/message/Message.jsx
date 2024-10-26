import React from "react";
import { useParams } from "react-router-dom";
import { sampleMessages } from "../../utils/sampleMessages";
import MessageExpanded from "../../messages/messageExpanded/MessageExpanded";
import PageWrapper from "../../utils/PageWrapper";

const Message = () => {
  const { id } = useParams(); // Get the id from the URL parameter
  const messageId = parseInt(id, 10); // Convert the id to a number
  console.log("Message id:", messageId);

  // Find the message that matches the id
  const foundMessage = sampleMessages.reduce((acc, topic) => {
    const message = topic.messages.find((message) => message.id === messageId);

    return message ? message : acc; // Return the found message or the accumulator
  }, null); // Start with null as the initial value
  console.log("Found message:", foundMessage);

  return (
    <PageWrapper>
      <MessageExpanded
        title={foundMessage.title}
        content={foundMessage.content}
      />
    </PageWrapper>
  ); // Pass the found message to MessageExpanded
};

export default Message;
