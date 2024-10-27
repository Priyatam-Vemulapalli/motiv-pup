// page.js

"use client";

import { useState, useEffect, useRef } from 'react';
import AWS from 'aws-sdk'; // Import AWS SDK
import ChatbotStyles from './styles'; // Assuming styles.js is in the same folder

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [emotion, setEmotion] = useState('');
  const chatWindowRef = useRef(null);

  const videoRef = useRef(null); // Reference to the video element for the webcam
  const canvasRef = useRef(null); // Reference to the canvas to capture the image


  const rekognition = new AWS.Rekognition({
    region: 'us-east-1', // Update this to your desired region
    accessKeyId: 'YOUR_ACCESS_KEY_ID', // Add your AWS Access Key ID
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY', // Add your AWS Secret Access Key
  });

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

  // Capture image 
  const captureImage = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Draw the current frame from the video onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height); // Testing purpose remove it later

    // Get the image data from the canvas as a Blob (or base64)
    const imageData = canvas.toDataURL('image/jpeg');

    // Convert base64 image to binary format for Rekognition
    const base64Data = imageData.replace(/^data:image\/jpeg;base64,/, '');
    const binaryData = Buffer.from(base64Data, 'base64');

    // Call Rekognition's detectFaces to analyze the image
    const params = {
      Image: {
        Bytes: binaryData,
      },
      Attributes: ['ALL'], // Include emotions in the response
    };

    try {
      const rekognitionResponse = await rekognition.detectFaces(params).promise();
      const faceDetails = rekognitionResponse.FaceDetails;

      if (faceDetails.length > 0) {
        const emotions = faceDetails[0].Emotions;
        const dominantEmotion = emotions.reduce((prev, current) =>
          prev.Confidence > current.Confidence ? prev : current
        );
        setEmotion(dominantEmotion.Type);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `You seem to be feeling: ${dominantEmotion.Type}`, sender: 'bot' },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Message response without emotion', sender: 'bot' },
        ]);
      }
    } catch (error) {
      console.error('Error detecting faces: ', error);
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

  return (
    <div style={ChatbotStyles.container}>
      <img
        src="/puppy.gif"
        alt="Puppy GIF"
        style={ChatbotStyles.puppyGif} // Applying custom style for positioning
      />
      <div style={ChatbotStyles.chatWrapper}>
        {/* Header */}
        <div style={ChatbotStyles.header}>
          <img 
            src="/screen.png" 
            alt="Moti-Pup Logo" 
            style={{ width: '100%', height: '100%', objectFit: 'fill' }} // Ensures the logo fills the header div
          />
          
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

      {/* Start Webcam when page loads */}
      {useEffect(() => startWebcam(), [])}
    </div>
  );
}
