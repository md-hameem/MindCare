from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json
from datetime import datetime
import logging

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# System message for context awareness
SYSTEM_MESSAGE = """
You are MindCare AI, You are a supportive and empathetic mental health companion. Your tone should be kind, non-judgmental, and helpful. Avoid giving medical advice, but encourage self-care and emotional expression, a mental health support companion. Your primary purpose is to:
1. Provide emotional support and counseling
2. Help users manage stress, anxiety, and depression
3. Encourage positive mental health practices
4. Remind users to seek professional help when needed

You should avoid:
- Medical diagnosis
- Prescribing treatments
- Discussing non-mental health topics
- Providing personal opinions

Always maintain a compassionate, non-judgmental tone.
"""

# Schemas
class MoodLog(BaseModel):
    mood: str
    notes: str
    user_id: str

class ChatInput(BaseModel):
    message: str

def format_response(response_text):
    """Format AI response for better readability"""
    return {
        "message": response_text,
        "timestamp": datetime.now().isoformat(),
        "type": "response"
    }

def is_mental_health_related(message):
    """Check if message relates to mental health"""
    keywords = [
        "stress", "anxiety", "depression", "mood", "feelings", 
        "counseling", "therapy", "support", "help", "mental health"
    ]
    message_lower = message.lower()
    return any(keyword in message_lower for keyword in keywords)

@app.post("/api/mood-log")
def log_mood(entry: MoodLog):
    try:
        logger.info(f"Mood log received for user {entry.user_id}")
        return {"status": "success", "message": "Mood logged successfully (not stored persistently)"}
    except Exception as e:
        logger.error(f"Error logging mood: {str(e)}")
        return {"error": "Failed to log mood"}

@app.post("/api/chatbot")
def chat(input: ChatInput):
    try:
        user_message = input.message
        
        # Check if message is related to mental health
        if not is_mental_health_related(user_message):
            return {
                "response": format_response(
                    "I'm here to help with mental health concerns. "
                    "If you're feeling stressed, anxious, or need emotional support, I'm here to listen."
                )
            }
        
        # Prepare context-aware prompt
        prompt = f"{SYSTEM_MESSAGE}\n\nUser: {user_message}\nAI:"
        
        # Get response from Ollama model
        try:
            response = requests.post(
                "http://localhost:11434/api/generate",
                json={
                    "model": "llama3",
                    "prompt": prompt,
                    "max_tokens": 500,
                    "temperature": 0.7
                },
                timeout=30,
                stream=True  # Enable streaming
            )
            response.raise_for_status()  # Raise exception for HTTP errors
            
            # Aggregate streaming response
            full_response = ""
            for chunk in response.iter_lines():
                if chunk:
                    chunk_data = json.loads(chunk.decode('utf-8'))
                    full_response += chunk_data.get('response', '')
            
            # Check if we have a valid response
            if not full_response.strip():
                return {"error": "AI response was empty"}
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Ollama request error: {str(e)}")
            return {"error": "Failed to connect to the AI model"}
        
        # Filter and format response
        final_response = format_response(
            f"I'm here to support you. {full_response}"
        )
        
        return {"response": final_response}
    
    except Exception as e:
        logger.error(f"Chat error: {str(e)}", exc_info=True)
        return {"error": "An error occurred while processing your request"}

@app.get("/api/rewards/{user_id}")
def get_rewards(user_id: str):
    try:
        # Simulate rewards calculation without database
        return {"points": 0, "message": "Rewards feature is available but not logging data"}
    except Exception as e:
        logger.error(f"Rewards error: {str(e)}")
        return {"error": "Failed to retrieve rewards"}