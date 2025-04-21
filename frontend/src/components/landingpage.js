import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div 
          className="flex flex-col items-center justify-center h-full space-y-8"
          initial={{ y: '20px', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-5xl font-extrabold text-center text-gradient text-blue-600 to-purple-700"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            MindCare AI
          </motion.h1>
          
          <motion.div className="space-y-6 max-w-3xl text-center">
            <motion.p
              className="text-xl text-gray-700"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Your personal mental health companion powered by advanced AI technology
            </motion.p>
            
            <motion.div className="space-y-4">
              <motion.div 
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <span className="text-4xl text-blue-600">
                  <motion.span 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    ⚙️
                  </motion.span>
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">Ollama Local Server</h3>
                  <p className="text-sm text-gray-600">
                    Running on Ollama's custom model for context-aware responses
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <span className="text-4xl text-indigo-600">
                  <motion.span 
                    animate={{ y: -5 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    🚀
                  </motion.span>
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">FastAPI Backend</h3>
                  <p className="text-sm text-gray-600">
                    Python-based REST API with MongoDB integration for real-time data storage
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div className="mt-12">
            <Link to="/chat">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-10 py-4 rounded-full shadow-xl font-semibold tracking-wider"
              >
                Start Conversation
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;