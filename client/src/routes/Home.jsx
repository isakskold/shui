import Messages from "../components/messages/Messages";
import PostMessage from "../components/messages/PostMessage";
import Nav from "../components/headerNav/layouts/DesktopNav";
function Home() {
  return (
    <>
      <PostMessage />
      <Messages />
    </>
  );
}

export default Home;
