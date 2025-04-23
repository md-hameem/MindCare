import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the session token from cookies
    document.cookie = 'session_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=lax; Secure=false; HttpOnly=false';
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/">
            <motion.span 
              className="text-2xl font-bold text-blue-700"
              whileTap={{ scale: 0.95 }}
            >
              MindCare
            </motion.span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/">
              <motion.div 
                className="text-gray-600 hover:text-blue-600 transition duration-300"
                whileTap={{ scale: 0.8 }}
              >
                <FaHome size={24} />
              </motion.div>
            </Link>
            
            <Link to="/profile">
              <motion.div 
                className="text-gray-600 hover:text-blue-600 transition duration-300"
                whileTap={{ scale: 0.8 }}
              >
                <FaUser size={24} />
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
            
            <Link to="/register">
              <motion.div 
                className="text-gray-600 hover:text-blue-600 transition duration-300"
                whileTap={{ scale: 0.8 }}
              >
                Register
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;