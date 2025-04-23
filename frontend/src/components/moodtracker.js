import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function MoodTracker() {
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!mood.trim() || !notes.trim()) {
      setMessage("Please fill in both fields before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/mood-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, notes, user_id: "user1" })
      });

      if (!response.ok) {
        throw new Error("Failed to submit mood log.");
      }

      setMood("");
      setNotes("");
      setMessage("Mood submitted successfully!");
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <motion.div 
      className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-center text-blue-600">Mood Tracker</h1>
      <p className="text-gray-600 text-center">Log your mood and identify triggers to better understand your emotions.</p>

      {message && (
        <div className="text-center text-sm text-red-500 mb-4">{message}</div>
      )}

      <div className="space-y-4">
        <input
          className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="How are you feeling today?"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
        <textarea
          className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="What triggered this mood?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <motion.button 
          onClick={handleSubmit} 
          className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full font-semibold hover:bg-blue-600 transition duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </div>
    </motion.div>
  );
}