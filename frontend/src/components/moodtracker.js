import React, { useState } from 'react';
export default function MoodTracker() {
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    await fetch("http://localhost:8000/api/mood-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood, notes, user_id: "user1" })
    });
    alert("Mood submitted!");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-2">Mood Tracker</h1>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Mood"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </div>
  );
}