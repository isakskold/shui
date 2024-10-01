import React from "react";
import Messages from "./components/Messages";
import PostMessage from "./components/PostMessage";
import Login from "./components/Login";
import { useMessages } from "./hooks/useMessages";
import "./globalStyles.css";

function App() {
  const { messages, loading, postMessage, removeMessage, modifyMessage } =
    useMessages();

  return (
    <>
      <Login />
      <PostMessage postMessage={postMessage} />
      <Messages
        messages={messages}
        loading={loading}
        removeMessage={removeMessage}
        modifyMessage={modifyMessage}
      />
    </>
  );
}

export default App;
