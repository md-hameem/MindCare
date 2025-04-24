import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaRobot,
  FaSmile,
  FaBell,
  FaHeart,
  FaUserMd,
  FaUser,
} from "react-icons/fa";

const LandingPage = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          className="flex flex-col items-center justify-center h-full space-y-8"
          initial={{ y: "20px", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to MindCare AI
          </motion.h1>

          <motion.p
            className="text-lg text-gray-700 max-w-2xl text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Empowering your mental health journey with cutting-edge AI
            technology. Discover personalized tools and resources to enhance
            your well-being.
          </motion.p>
        </motion.div>

        <section className="mt-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              to="/chat"
              className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center hover:shadow-xl transition"
            >
              <FaRobot className="text-blue-600 text-6xl mb-4" />
              <h3 className="font-semibold text-gray-800 text-lg text-center">
                AI Chatbot
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Engage in meaningful conversations with our AI-powered chatbot
                for mental health support.
              </p>
            </Link>

            <Link
              to="/moodtracker"
              className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center hover:shadow-xl transition"
            >
              <FaSmile className="text-yellow-500 text-6xl mb-4" />
              <h3 className="font-semibold text-gray-800 text-lg text-center">
                Mood Tracker
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Track your mood patterns and gain insights into your emotional
                well-being.
              </p>
            </Link>

            <Link
              to="/emergencyalert"
              className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center hover:shadow-xl transition"
            >
              <FaBell className="text-red-500 text-6xl mb-4" />
              <h3 className="font-semibold text-gray-800 text-lg text-center">
                Emergency Alerts
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Get immediate assistance during critical situations with our
                alert system.
              </p>
            </Link>

            <Link
              to="/moodbooster"
              className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center hover:shadow-xl transition"
            >
              <FaHeart className="text-pink-500 text-6xl mb-4" />
              <h3 className="font-semibold text-gray-800 text-lg text-center">
                Mood Booster
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Access activities and resources to uplift your mood and stay
                positive.
              </p>
            </Link>

            <Link
              to="/docsuggestion"
              className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center hover:shadow-xl transition"
            >
              <FaUserMd className="text-green-500 text-6xl mb-4" />
              <h3 className="font-semibold text-gray-800 text-lg text-center">
                Doctor Suggestions
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Receive personalized recommendations for professional mental
                health support.
              </p>
            </Link>

            <Link
              to="/profile"
              className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center hover:shadow-xl transition"
            >
              <FaUser className="text-purple-600 text-6xl mb-4" />
              <h3 className="font-semibold text-gray-800 text-lg text-center">
                User Profile
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Manage your preferences and track your progress in one place.
              </p>
            </Link>
          </div>
        </section>
      </div>

      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; 2025 MindCare AI. All rights reserved.
          </p>
        </div>
      </footer>
    </motion.div>
  );
};

export default LandingPage;
