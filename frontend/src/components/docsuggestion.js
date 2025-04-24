import React from 'react';
import { motion } from 'framer-motion';

const DoctorSuggestion = () => {
  return (
    <motion.div
      className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-center text-blue-600">Doctor Suggestion System</h1>
      <p className="text-gray-600 text-center">
        Find nearby therapists and mental health professionals in Dhaka, Bangladesh.
      </p>

      <div className="mt-6">
        <iframe
          title="Dhaka Hospitals Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.689374774123!2d90.3665093142985!3d23.82234809129264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7b8b8b8b8b8%3A0x8b8b8b8b8b8b8b8b!2sDhaka%20Hospital!5e0!3m2!1sen!2sbd!4v1612345678901!5m2!1sen!2sbd"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          If you need immediate assistance, please contact a mental health professional or visit the nearest hospital.
        </p>
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-xl font-bold text-gray-800">Emergency Contacts in Bangladesh</h2>
        <ul className="mt-4 space-y-2">
          <li className="text-gray-600">
            <strong>National Emergency Service:</strong> 999
          </li>
          <li className="text-gray-600">
            <strong>Fire Service:</strong> 199
          </li>
          <li className="text-gray-600">
            <strong>Ambulance Service:</strong> 16263
          </li>
          <li className="text-gray-600">
            <strong>Police:</strong> 100
          </li>
          <li className="text-gray-600">
            <strong>Suicide Prevention Hotline:</strong> 106
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default DoctorSuggestion;