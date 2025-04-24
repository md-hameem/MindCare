import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function MoodTracker() {
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [moodLogs, setMoodLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/profile", {
          credentials: "include",
        });

        if (!response.ok) {
          navigate("/login", { replace: true });
        }
      } catch (error) {
        navigate("/login", { replace: true });
      }
    };

    const fetchMoodLogs = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/mood-logs", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setMoodLogs(data);
        }
      } catch (error) {
        console.error("Failed to fetch mood logs", error);
      }
    };

    checkAuth();
    fetchMoodLogs();
  }, [navigate]);

  const handleSubmit = async () => {
    if (!mood.trim() || !notes.trim()) {
      setMessage("Please fill in both fields before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/profile", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile.");
      }

      const userProfile = await response.json();
      const userId = userProfile.username; // Assuming username is used as user_id

      const moodLogResponse = await fetch("http://localhost:8000/api/mood-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include session token
        body: JSON.stringify({ mood, notes, user_id: userId }),
      });

      if (!moodLogResponse.ok) {
        throw new Error("Failed to submit mood log.");
      }

      setMood("");
      setNotes("");
      setMessage("Mood submitted successfully!");

      // Refresh mood logs
      const updatedLogs = await fetch("http://localhost:8000/api/mood-logs", {
        credentials: "include",
      });
      if (updatedLogs.ok) {
        const data = await updatedLogs.json();
        setMoodLogs(data);
      }
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

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800">Your Mood Logs</h2>
        <ul className="space-y-4 mt-4">
          {moodLogs.map((log, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-lg shadow">
              <p><strong>Mood:</strong> {log.mood}</p>
              <p><strong>Notes:</strong> {log.notes}</p>
              <p><strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}