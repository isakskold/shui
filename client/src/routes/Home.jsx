import Messages from "../components/messages/Messages";
import PostMessage from "../components/messages/PostMessage";
import Nav from "../components/headerNav/Nav";
function Home() {
  return (
    <>
      <Nav />
      <PostMessage />
      <Messages />
    </>
  );
}

export default Home;
