import React from 'react';
import { motion } from 'framer-motion';
import heroImg from './mentalHealth.jpg';
// import heroImg from "/public/mentalHealth.jpg"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col items-center justify-center text-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-extrabold text-indigo-800 mb-4"
      >
        Welcome to MindCare 💙
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg md:text-xl text-gray-700 max-w-xl mb-6"
      >
        Your AI-powered companion for mental health and emotional support. Track your mood, chat with our AI, and take control of your well-being.
      </motion.p>

      <motion.img
        src={heroImg}
        alt="Mental Health Hero"
        className="w-3/4 md:w-1/2 rounded-xl shadow-lg border-4 border-indigo-300"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      />

      <motion.div
        className="mt-8 flex gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <a href="#mood" className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition duration-300">Start Tracking</a>
        <a href="#chat" className="bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-100 transition duration-300">Talk to AI</a>
      </motion.div>
    </div>
  );
}