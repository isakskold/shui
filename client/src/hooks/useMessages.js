import { useState, useEffect } from "react";
import {
  fetchMessages,
  sendMessage,
  deleteMessage,
  updateMessage,
} from "../api";

export const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  // Fetch messages only when the component mounts or page refreshes
  const getMessages = async () => {
    try {
      const result = await fetchMessages();
      setMessages(result.messages);
    } catch (err) {
      setError(err.message);
    }
  };

  // Post a new message and update the local state
  const postMessage = async (messageData) => {
    try {
      const newMessage = await sendMessage(messageData);
      setMessages((prevMessages) => [newMessage, ...prevMessages]); // Update local state with new message
    } catch (err) {
      setError(err.message);
    }
  };

  // Remove a message locally and on the API
  const removeMessage = async (id) => {
    try {
      await deleteMessage(id);
      setMessages(
        (prevMessages) => prevMessages.filter((message) => message.id !== id) // Update local state by removing the deleted message
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Update a message locally and on the API
  const modifyMessage = async (id, data) => {
    try {
      const updatedMessage = await updateMessage(id, data);
      setMessages((prevMessages) =>
        prevMessages.map(
          (message) => (message.id === id ? updatedMessage : message) // Update local state by modifying the message
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Call getMessages when the component mounts
  useEffect(() => {
    getMessages();
  }, []);

  return {
    messages,
    error,
    postMessage,
    removeMessage,
    modifyMessage,
  };
};
