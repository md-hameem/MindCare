import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import LandingPage from './components/landingpage';
import ChatInterface from './components/chatbot';
import Navbar from './components/navbar';
import Login from './components/login';
import Register from './components/register';
import Profile from './components/userprofile';
import MoodTracker from './components/moodtracker';
import MoodBooster from './components/moodbooster';
import EmergencyAlert from './components/emargencyalert';
import DoctorSuggestion from './components/docsuggestion';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/moodtracker" element={<MoodTracker />} />
        <Route path="/moodbooster" element={<MoodBooster />} />
        <Route path="/emergencyalert" element={<EmergencyAlert />} />
        <Route path="/docsuggestion" element={<DoctorSuggestion />} />
      </Routes>
    </Router>
  );
}

export default App;