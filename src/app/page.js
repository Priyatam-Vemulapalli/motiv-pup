"use client";

import { useState, useEffect, useRef } from 'react';
import ChatbotStyles from './styles'; 

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: 'Hello! How are you?', sender: 'bot' }
  ]);
  const [userMessage, setUserMessage] = useState('');

  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!userMessage.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userMessage, sender: 'user' }
    ]);

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: ` "${userMessage}"`, sender: 'bot' } // api hits here
    ]);

    setUserMessage(''); // Clear the input field after sending
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div style={ChatbotStyles.container}>
      <div style={ChatbotStyles.chatWrapper}>
        {/* Header */}
        <div style={ChatbotStyles.header}>
          <span style={ChatbotStyles.username}>Motiv-Pup</span>
          <button style={ChatbotStyles.closeButton}>-</button> {/* rewrite the code to minimize the window when clicked */}
        </div>

        {/* Chat Window */}
        <div ref={chatWindowRef} style={ChatbotStyles.chatWindow}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={
                message.sender === 'user'
                  ? ChatbotStyles.userMessage
                  : ChatbotStyles.botMessage
              }
            >
              {message.text}
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div style={ChatbotStyles.inputContainer}>
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={handleKeyDown} 
            style={ChatbotStyles.input}
            placeholder="Type your message..."
          />
          <button onClick={handleSend} style={ChatbotStyles.button}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
