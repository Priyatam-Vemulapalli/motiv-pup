"use client";

import { useState, useEffect, useRef } from 'react';
import ChatbotStyles from './styles'; // Assuming styles.js is in the same folder

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const chatWindowRef = useRef(null);
  const videoRef = useRef(null); // Reference to the video element for the webcam
  const canvasRef = useRef(null); // Reference to the canvas to capture the image

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const startWebcam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error('Error accessing webcam: ', err));
  };

  const captureImage = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Draw the current frame from the video onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the image data from the canvas as a base64 string
    const imageData = canvas.toDataURL('image/jpeg');

    try {
      // Send the image data to the API route for emotion detection
      const response = await fetch('/api/detectEmotion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });

      const result = await response.json();
      const detectedEmotion = result.emotion || "Emotion detection failed";

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `You seem to be feeling: ${detectedEmotion}`, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error detecting emotion:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Error detecting emotion. Please try again.', sender: 'bot' },
      ]);
    }
  };

  const handleSend = () => {
    if (!userMessage.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userMessage, sender: 'user' }
    ]);

    captureImage(); // Capture image and analyze emotion when the user sends a message

    setUserMessage('');
  };

  useEffect(() => startWebcam(), []);

  return (
    <div style={ChatbotStyles.container}>
      <img
        src="/puppy.gif"
        alt="Puppy GIF"
        style={ChatbotStyles.puppyGif} // Applying custom style for positioning
      />
      <div style={ChatbotStyles.chatWrapper}>
        <div style={ChatbotStyles.header}>
          <img 
            src="/screen.png" 
            alt="Moti-Pup Logo" 
            style={{ width: '100%', height: '100%', objectFit: 'fill' }}
          />
        </div>

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

        <div style={ChatbotStyles.inputContainer}>
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={ChatbotStyles.input}
            placeholder="Type your message..."
          />
          <button onClick={handleSend} style={ChatbotStyles.button}>
            Send
          </button>
        </div>
      </div>

      {/* Hidden Video and Canvas for Webcam Capture */}
      <video ref={videoRef} style={{ display: 'none' }} autoPlay></video>
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
    </div>
  );
}
