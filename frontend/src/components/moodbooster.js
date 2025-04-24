import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MoodBooster = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/mood-booster', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (err) {
      setError('An error occurred while fetching recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-center text-blue-600">Mood Booster</h1>
      <p className="text-gray-600 text-center">Get AI-generated recommendations to improve your mood.</p>

      <div className="text-center">
        <button
          onClick={fetchRecommendations}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
        >
          Get Recommendations
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <ul className="space-y-4 mt-4">
        {recommendations.map((rec, index) => (
          <li key={index} className="p-4 bg-gray-100 rounded-lg shadow">
            {rec}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default MoodBooster;