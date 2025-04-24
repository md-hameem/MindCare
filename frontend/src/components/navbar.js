import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt, FaHeartbeat, FaLightbulb, FaExclamationTriangle, FaHospital, FaComments } from 'react-icons/fa';
import MoodTracker from './moodtracker';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);

  useEffect(() => {
    // Check if the user is logged in by verifying the session token
    fetch('http://localhost:8000/api/profile', {
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  const handleLogout = () => {
    // Call the logout endpoint
    fetch('http://localhost:8000/api/logout', {
      method: 'POST',
      credentials: 'include', // Include credentials (cookies)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Logout failed');
        }
        return response.json();
      })
      .then(() => {
        setIsLoggedIn(false);
        setPopupMessage('Logout successful');
        setTimeout(() => setPopupMessage(null), 3000);
        navigate('/login');
      })
      .catch(error => {
        console.error('Logout error:', error);
        setPopupMessage('Logout failed. Please try again.');
        setTimeout(() => setPopupMessage(null), 3000);
      });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/">
          <motion.span 
            className="text-2xl font-bold text-blue-700"
            whileTap={{ scale: 0.95 }}
          >
            MindCare
          </motion.span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6">
            <Link to="/">
              <motion.div 
                className="text-gray-600 hover:text-blue-600 transition duration-300 flex items-center gap-2"
                whileTap={{ scale: 0.8 }}
              >
                <FaHome size={20} />
                <span className="hidden md:inline">Home</span>
              </motion.div>
            </Link>

            {isLoggedIn && (
              <Link to="/profile">
                <motion.div 
                  className="text-gray-600 hover:text-blue-600 transition duration-300 flex items-center gap-2"
                  whileTap={{ scale: 0.8 }}
                >
                  <FaUser size={20} />
                  <span className="hidden md:inline">Profile</span>
                </motion.div>
              </Link>
            )}

            {isLoggedIn && (
              <Link to="/moodtracker">
                <motion.div 
                  className="text-gray-600 hover:text-blue-600 transition duration-300 flex items-center gap-2"
                  whileTap={{ scale: 0.8 }}
                >
                  <FaHeartbeat size={20} />
                  <span className="hidden md:inline">Mood Tracker</span>
                </motion.div>
              </Link>
            )}

            {isLoggedIn && (
              <Link to="/moodbooster">
                <motion.div 
                  className="text-gray-600 hover:text-blue-600 transition duration-300 flex items-center gap-2"
                  whileTap={{ scale: 0.8 }}
                >
                  <FaLightbulb size={20} />
                  <span className="hidden md:inline">Mood Booster</span>
                </motion.div>
              </Link>
            )}

            {isLoggedIn && (
              <Link to="/emergencyalert">
                <motion.div 
                  className="text-gray-600 hover:text-red-600 transition duration-300 flex items-center gap-2"
                  whileTap={{ scale: 0.8 }}
                >
                  <FaExclamationTriangle size={20} />
                  <span className="hidden md:inline">Emergency Alert</span>
                </motion.div>
              </Link>
            )}

            {isLoggedIn && (
              <Link to="/docsuggestion">
                <motion.div 
                  className="text-gray-600 hover:text-blue-600 transition duration-300 flex items-center gap-2"
                  whileTap={{ scale: 0.8 }}
                >
                  <FaHospital size={20} />
                  <span className="hidden md:inline">Doctor Suggestion</span>
                </motion.div>
              </Link>
            )}

            {isLoggedIn && (
              <Link to="/chat">
                <motion.div 
                  className="text-gray-600 hover:text-blue-600 transition duration-300 flex items-center gap-2"
                  whileTap={{ scale: 0.8 }}
                >
                  <FaComments size={20} />
                  <span className="hidden md:inline">Chat Bot</span>
                </motion.div>
              </Link>
            )}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-500 transition duration-300"
                whileTap={{ scale: 0.8 }}
              >
                <FaSignOutAlt size={24} />
              </button>
            )}

            {!isLoggedIn && (
              <>
                <Link to="/register">
                  <motion.div 
                    className="text-gray-600 hover:text-blue-600 transition duration-300"
                    whileTap={{ scale: 0.8 }}
                  >
                    Register
                  </motion.div>
                </Link>

                <Link to="/login">
                  <motion.div 
                    className="text-gray-600 hover:text-blue-600 transition duration-300"
                    whileTap={{ scale: 0.8 }}
                  >
                    Login
                  </motion.div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {popupMessage && (
        <div className="fixed top-16 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg">
          {popupMessage}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;