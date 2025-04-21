import React from 'react';
import LandingPage from './components/landingpage';
import MoodTracker from './components/moodtracker';
import Chatbot from './components/chatbot';

function App() {
  return (
    <div>
      <LandingPage />
      <div id="mood">
        <MoodTracker />
      </div>
      <div id="chat">
        <Chatbot />
      </div>
    </div>
  );
}

export default App;