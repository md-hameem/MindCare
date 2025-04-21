import React, { useState } from 'react';
export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await fetch("http://localhost:8000/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    setResponse(data.response || data.error);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-2">MindCare Chatbot</h1>
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} className="bg-green-500 text-white px-4 py-2 rounded">Send</button>
      <div className="mt-4 border p-2 min-h-[100px]">{response}</div>
    </div>
  );
}