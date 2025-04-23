from fastapi import FastAPI, Request, HTTPException, status, Depends, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json
from datetime import datetime
import logging
from pymongo import MongoClient
from passlib.context import CryptContext
from typing import Optional
from fastapi.security import APIKeyCookie
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Atlas Connection
client = MongoClient("mongodb+srv://MindCare:mindcare123456@mindcare.bylphla.mongodb.net/?retryWrites=true&w=majority&appName=MindCare")
db = client.mindcare
users_collection = db.users

security = HTTPBearer()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Session management
session_cookie = APIKeyCookie(name="session_token")

# System message for context awareness
SYSTEM_MESSAGE = """
You are MindCare AI, You are a supportive and empathetic mental health companion. Your tone should be kind, non-judgmental, and helpful. Avoid giving medical advice, but encourage self-care and emotional expression. Your primary purpose is to:
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

class UserRegister(BaseModel):
    username: str
    password: str
    email: str

class UserLogin(BaseModel):
    username: str
    password: str

def format_response(response_text):
    """Format AI response for better readability"""
    return {
        "message": response_text,
        "timestamp": datetime.now().isoformat(),
        "type": "response"
    }

# Session management
def get_current_user(request: Request):
    session_token = request.cookies.get("session_token")
    
    if not session_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    # Here you would typically validate the session token against your database
    # For simplicity, we're assuming the token is valid if it exists
    return {"username": "authenticated_user"}

@app.post("/api/register")
def register(user: UserRegister):
    try:
        # Check if user already exists
        existing_user = users_collection.find_one({"username": user.username})
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already registered"
            )
        
        # Hash password
        hashed_password = pwd_context.hash(user.password)
        
        # Create new user
        new_user = {
            "username": user.username,
            "password": hashed_password,
            "email": user.email,
            "created_at": datetime.now()
        }
        
        users_collection.insert_one(new_user)
        return {"status": "success", "message": "User registered successfully"}
    
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Registration failed"
        )

@app.post("/api/login")
def login(user: UserLogin, response: Response):
    try:
        # Find user
        db_user = users_collection.find_one({"username": user.username})
        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid username or password"
            )
        
        # Verify password
        if not pwd_context.verify(user.password, db_user["password"]):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid username or password"
            )
        
        # Set session cookie
        response.set_cookie(
            key="session_token",
            value="dummy_token",
            httponly=True,
            secure=False,  # Set to True in production
            samesite="lax",
            max_age=3600  # 1 hour expiry
        )
        
        return {"status": "success", "message": "Login successful"}
    
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed"
        )
    
@app.get("/api/profile")
def get_profile(request: Request):
    try:
        current_user = get_current_user(request)
        db_user = users_collection.find_one({"username": current_user["username"]})
        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        return {
            "username": db_user["username"],
            "email": db_user["email"],
            "created_at": db_user["created_at"].isoformat()
        }
    
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Profile error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve profile"
        )

@app.post("/api/chatbot")
def chat(input: ChatInput, request: Request):
    try:
        # Check if user is authenticated
        current_user = get_current_user(request)
        
        user_message = input.message
        
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
    
    except HTTPException as e:
        raise e
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