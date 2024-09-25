import React, { useState } from "react";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: var(--primary-blue);
  color: white;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-blue-hover);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const PostMessage = ({ postMessage }) => {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handlePostMessage = (e) => {
    e.preventDefault();
    if (username && text) {
      postMessage({ username, text });
      setUsername("");
      setText("");
      setIsFormVisible(false); // Hide the form after posting
    }
  };

  return (
    <Container>
      <Button onClick={() => setIsFormVisible((prev) => !prev)}>
        Post a message
      </Button>
      {isFormVisible && (
        <Form onSubmit={handlePostMessage}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Your message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <Button type="submit">Publish message</Button>
        </Form>
      )}
    </Container>
  );
};

export default PostMessage;
