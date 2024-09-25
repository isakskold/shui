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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMessages = async () => {
    setLoading(true);
    try {
      const result = await fetchMessages();
      setMessages(result.messages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const postMessage = async (messageData) => {
    try {
      await sendMessage(messageData);
      getMessages(); // Refresh the list after sending a message
    } catch (err) {
      setError(err.message);
    }
  };

  const removeMessage = async (id) => {
    try {
      await deleteMessage(id);
      getMessages(); // Refresh the list after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  const modifyMessage = async (id, data) => {
    try {
      await updateMessage(id, data);
      getMessages(); // Refresh the list after updating
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return {
    messages,
    loading,
    error,
    postMessage,
    removeMessage,
    modifyMessage,
  };
};
