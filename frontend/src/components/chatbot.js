import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiSendPlaneFill } from 'react-icons/ri';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    // Add welcome message when component mounts
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        text: "Hello! I'm your MindCare AI companion. How can I help you today?",
        isUser: false,
        createdAt: new Date()
      }
    ]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const newMessage = { 
      id: Date.now(), 
      text: input, 
      isUser: true,
      createdAt: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsThinking(true);
    
    // Simulate AI response processing
    setTimeout(async () => {
      try {
        const res = await fetch("http://localhost:8000/api/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input })
        });
        const data = await res.json();
        
        if (data.response) {
          setMessages(prev => [
            ...prev,
            {
              id: Date.now(),
              text: data.response.message,
              isUser: false,
              createdAt: new Date()
            }
          ]);
        } else if (data.error) {
          setMessages(prev => [
            ...prev,
            {
              id: Date.now(),
              text: data.error,
              isUser: false,
              createdAt: new Date()
            }
          ]);
        }
      } catch (error) {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now(),
            text: "An error occurred while processing your request. Please try again later.",
            isUser: false,
            createdAt: new Date()
          }
        ]);
      }
      setIsThinking(false);
    }, 1000);
  };

  return (
    <motion.div 
      className="h-screen bg-gradient-to-br from-blue-50 to-indigo-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-full mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
          <div className="relative h-[400px] overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                className={`flex items-end ${
                  msg.isUser ? 'justify-end' : 'justify-start'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`max-w-[80%] p-4 rounded-xl ${
                  msg.isUser 
                    ? 'bg-blue-500 text-white rounded-tr-none'
                    : 'bg-gray-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            
            {isThinking && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-4 rounded-xl bg-gray-100 rounded-tl-none">
                  <span className="typing-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 p-4 h-24 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Share your thoughts..."
            />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              className="bg-blue-600 text-white p-3 rounded-xl flex items-center gap-2 transition duration-200 hover:bg-blue-700"
            >
              <RiSendPlaneFill />
              Send
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatInterface;