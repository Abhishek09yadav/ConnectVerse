import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const ChatScreen = ({ id }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    console.log("Chat ID:", id);
    const newSocket = io.connect(process.env.SOCKET_IO);
    setSocket(newSocket);
    if (id) {
      newSocket.emit("join_room", id);
    }
    newSocket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      newSocket.disconnect();
    };
  }, [id]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "" || !socket) return;

    const messageData = {
      userId: id,
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleString(),
    };

    socket.emit("send_message", messageData);
    setMessages((prev) => [...prev, messageData]);
    setInputMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-inter antialiased relative">
      <div className="bg-white  p-4 shadow-md rounded-b-lg flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">
          Chat with User {id || "N/A"}
        </h1>
        <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold">
          U
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            Start a conversation!
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg shadow-sm ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-300 text-gray-800 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-75 mt-1 block text-right">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={sendMessage}
        className="bg-white p-4 shadow-md rounded-t-lg flex items-center fixed w-full bottom-0"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-3 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out shadow-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatScreen;
