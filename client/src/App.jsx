import React from "react";
import Messages from "./components/Messages";
import PostMessage from "./components/PostMessage";
import { useMessages } from "./hooks/useMessages";

function App() {
  const {
    messages,
    loading,
    error,
    postMessage,
    removeMessage,
    modifyMessage,
  } = useMessages();

  return (
    <>
      <PostMessage postMessage={postMessage} />
      <Messages
        messages={messages}
        loading={loading}
        error={error}
        removeMessage={removeMessage}
        modifyMessage={modifyMessage}
      />
    </>
  );
}

export default App;
