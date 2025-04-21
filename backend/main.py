from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess
import json
from pymongo import MongoClient

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017")
db = client.mindcare

# Schemas
class MoodLog(BaseModel):
    mood: str
    notes: str
    user_id: str

class ChatInput(BaseModel):
    message: str

@app.post("/api/mood-log")
def log_mood(entry: MoodLog):
    db.mood_logs.insert_one(entry.dict())
    return {"status": "success"}

@app.post("/api/chatbot")
def chat(input: ChatInput):
    try:
        result = subprocess.run(
            ["ollama", "run", "deepseek-coder"],
            input=input.message.encode(),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        response = result.stdout.decode()
        return {"response": response}
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/rewards/{user_id}")
def get_rewards(user_id: str):
    logs = db.mood_logs.count_documents({"user_id": user_id})
    return {"points": logs * 10}