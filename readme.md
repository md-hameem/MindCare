# MindCare: Mental Health Support Application

**MindCare** is an AI-powered mental health support platform designed to offer accessible, personalized, and interactive tools for promoting emotional well-being. By integrating cutting-edge AI technology, MindCare provides conversational support, mood tracking, personalized resources, and gamified motivation to empower users on their mental health journey.

---

## 🚀 Features

- **AI-Powered Chatbot**  
  Engage in empathetic conversations with an AI assistant trained to provide mental health guidance and emotional support.

- **Mood Tracking**  
  Log and visualize your emotional states over time to gain insight into your mood patterns and triggers.

- **Personalized Resource Recommendations**  
  Receive tailored suggestions for mental health content and coping strategies based on your input and needs.

- **Gamified Rewards System**  
  Encourage consistency and positive behavior with a point-based rewards system to reinforce healthy habits.

---

## 🧰 Prerequisites

- Python 3.8+
- Node.js 14+
- npm
- [Ollama](https://ollama.com/)

---

## ⚙️ Installation Guide

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/md-hameem/MindCare.git
   ```

2. **Navigate to the backend directory:**
   ```bash
   cd mindcare/backend
   ```

3. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate      # On macOS/Linux
   .\venv\Scripts\activate       # On Windows
   ```

4. **Install backend dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

---

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

---

## ▶️ Running the Application

### Start Ollama Server

1. **Pull the required model:**
   ```bash
   ollama pull llama3
   ```

2. **Run the Ollama server:**
   ```bash
   ollama run
   ```

### Launch Backend

```bash
uvicorn main:app --reload
```

### Launch Frontend

```bash
npm start
```

### Access the Application

Open your browser and navigate to:  
**[http://localhost:3000](http://localhost:3000)**

---

## 🧑‍💻 Usage Overview

- **Landing Page** – Introduction to MindCare and its features.
- **Chat Interface** – Start a conversation with the AI chatbot.
- **Mood Tracking** – Log moods and visualize emotional trends.
- **Rewards System** – Earn points and rewards for engagement and self-care activities.

---

## 🛠 Troubleshooting

- **Ollama Connection Issues**  
  Ensure the Ollama server is running at: [http://localhost:11434](http://localhost:11434)

- **Backend Errors**  
  Check terminal logs for error messages and stack traces.

- **Frontend Issues**  
  Verify all dependencies are installed and the development server is active.

---

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.

