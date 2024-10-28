import React from "react";
import { useParams } from "react-router-dom";
import MessageExpanded from "../../messages/messageExpanded/MessageExpanded";
import PageWrapper from "../../utils/PageWrapper";
import useNavigateMessageStore from "../../../hooks/useNavigateMessage";

const Message = () => {
  const { message, clearMessage } = useNavigateMessageStore();
  console.log(message);

  return (
    <PageWrapper>
      <MessageExpanded
        title={message.title}
        content={message.content}
        username={message.username}
      />
    </PageWrapper>
  );
};

export default Message;
