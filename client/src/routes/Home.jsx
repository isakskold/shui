import Messages from "../components/messages/Messages";
import PostMessage from "../components/messages/PostMessage";
import { useMessages } from "../hooks/useMessages";
import Nav from "../components/headerNav/Nav";
function Home() {
  const { messages, loading, postMessage, removeMessage, modifyMessage } =
    useMessages();

  return (
    <>
      <Nav />
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

export default Home;
