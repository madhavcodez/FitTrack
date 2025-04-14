from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import numpy as np
from typing import List, Dict, Any
import uvicorn
from dotenv import load_dotenv
from form_analysis import analyze_form

# Load environment variables
load_dotenv()

app = FastAPI(title="FitTrack AI Services", 
              description="AI services for FitTrack fitness application",
              version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to FitTrack AI Services API"}

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "ai"}

@app.post("/analyze-form")
async def analyze_exercise_form(video: UploadFile = File(...)):
    """
    Analyze exercise form from a video file
    """
    try:
        # Save uploaded video to temp file
        temp_file = f"temp_video_{video.filename}"
        with open(temp_file, "wb") as f:
            content = await video.read()
            f.write(content)
        
        # Analyze the form using our module
        results = analyze_form(temp_file)
        
        # Clean up temp file
        os.remove(temp_file)
        
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing form: {str(e)}")

@app.post("/analyze-form-mock")
async def analyze_exercise_form_mock():
    """
    Mock endpoint for form analysis (for testing without video upload)
    """
    return {
        "form_score": 85,
        "feedback": [
            "Good overall form",
            "Keep your back straighter during the squat",
            "Try to go deeper in your squat"
        ],
        "rep_count": 8,
        "angles": {
            "knee": [85, 90, 95, 100, 105, 110, 115, 120],
            "hip": [80, 85, 90, 95, 100, 105, 110, 115]
        }
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True) 