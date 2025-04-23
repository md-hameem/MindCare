import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile
    fetchProfile();
  }, []); // Removed navigate dependency to avoid unnecessary re-renders

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/profile', {
        credentials: 'include',  // Include credentials (cookies)
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403 || response.status === 404) {
          navigate('/login'); // Redirect to login if unauthorized
        } else {
          const data = await response.json();
          setError(data.detail || 'An error occurred.');
        }
        return;
      }

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError('Failed to retrieve profile information. Please try again later.');
      console.error(err);
    }
  };

  const handleLogout = () => {
    // Call the logout endpoint
    fetch('http://localhost:8000/api/logout', {
      method: 'POST',
      credentials: 'include',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      return response.json();
    })
    .then(data => {
      navigate('/login');
    })
    .catch(error => {
      setError('Logout failed. Please try again later.');
      console.error(error);
    });
  };

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
            <motion.div className="p-8 bg-white rounded-2xl shadow-xl max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                Your Profile
              </h2>
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                  {error}
                </div>
              )}
              {!profile ? (
                <div className="text-gray-500">
                  Loading profile information...
                </div>
              ) : (
                <div>
                  <p className="text-lg font-semibold mb-2">
                    Name: {profile.name}
                  </p>
                  <p className="text-lg font-semibold mb-2">
                    Username: {profile.username}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Email: {profile.email}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Joined: {new Date(profile.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-green-600 font-semibold mb-2">
                    Reward Points: {profile.reward_points}
                  </p>
                </div>
              )}
              <div className="mt-6">
                <button
                  onClick={handleLogout}
                  className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;