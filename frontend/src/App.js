// src/App.js

import React from 'react';
import MoodTracker from './components/moodtracker';
import Chatbot from './components/chatbot';

function App() {
  return (
    <div className="p-4">
      <MoodTracker />
      <Chatbot />
    </div>
  );
}

export default App;
