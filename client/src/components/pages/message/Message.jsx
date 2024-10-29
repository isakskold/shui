import React, { useEffect, useState } from "react";
import MessageExpanded from "../../messages/messageExpanded/MessageExpanded";
import PageWrapper from "../../utils/PageWrapper";
import useNavigateMessageStore from "../../../hooks/useNavigateMessage";
import { fetchSingleMessage } from "../../../api/fetchSingleMessage";
import { useParams } from "react-router-dom";

const Message = () => {
  const { id } = useParams(); // Get the message ID from URL params
  const { message, setMessage } = useNavigateMessageStore(); // Assuming you have setMessage to update the state
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setLoading(true);
        const fetchedMessage = await fetchSingleMessage(id);

        setMessage(fetchedMessage.content); // Update your state with the fetched message
      } catch (err) {
        console.error(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (!message || Object.keys(message).length === 0) {
      // Check if message state is empty
      fetchMessage(); // Fetch the message if state is empty
    } else {
      setLoading(false); // If message exists, set loading to false
    }
  }, [id, message, setMessage]); // Dependency array includes id and message

  if (loading) return;
  <PageWrapper>
    <p>Loading...</p>
  </PageWrapper>;

  return (
    <PageWrapper>
      <MessageExpanded
        title={message.title}
        content={message.text}
        username={message.username}
      />
    </PageWrapper>
  );
};

export default Message;
