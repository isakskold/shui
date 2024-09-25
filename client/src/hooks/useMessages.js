// src/hooks/useMessages.js
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

  const getMessages = async () => {
    try {
      const result = await fetchMessages();
      setMessages(result.messages);
    } catch (err) {
      setError(err.message);
    }
  };

  const postMessage = async (messageData) => {
    try {
      await sendMessage(messageData);
      await getMessages(); // Refresh the list after sending a message
    } catch (err) {
      setError(err.message);
    }
  };

  const removeMessage = async (id) => {
    try {
      await deleteMessage(id);
      await getMessages(); // Refresh the list after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  const modifyMessage = async (id, data) => {
    try {
      await updateMessage(id, data);
      await getMessages(); // Refresh the list after updating
    } catch (err) {
      setError(err.message);
    }
  };

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
