import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EmergencyAlert = () => {
  const [feelingSuicidal, setFeelingSuicidal] = useState(false);

  const handleEmergencyCall = () => {
    alert("Calling 999 for emergency assistance...");
  };

  return (
    <motion.div
      className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-center text-red-600">Emergency Alert</h1>
      <p className="text-gray-600 text-center">
        If you are feeling suicidal or in danger, please seek immediate help.
      </p>

      <div className="space-y-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Are you feeling suicidal?
        </label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setFeelingSuicidal(true)}
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-200"
          >
            Yes
          </button>
          <button
            onClick={() => setFeelingSuicidal(false)}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-200"
          >
            No
          </button>
        </div>
      </div>

      {feelingSuicidal && (
        <div className="mt-6 text-center">
          <p className="text-red-600 font-bold mb-4">
            Please stay calm. Help is on the way.
          </p>
          <button
            onClick={handleEmergencyCall}
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-200"
          >
            Call 999
          </button>
        </div>
      )}

      {feelingSuicidal === false && (
        <div className="mt-6 text-center">
          <p className="text-green-600 font-bold mb-4">
            "You are stronger than you think, and every day is a new opportunity to shine. Keep going!"
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default EmergencyAlert;