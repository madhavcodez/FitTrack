# FitTrack MVP - Data Collection Instructions

## Overview

This directory contains the scripts and instructions for collecting and generating test data for the FitTrack application. These scripts are designed to:

1. Generate dummy user profile data
2. Create synthetic workout logs
3. Produce sample video frames for pose estimation testing
4. Create nutrition and diet log samples

## Prerequisites

- Python 3.8+
- OpenCV (`pip install opencv-python`)
- NumPy (`pip install numpy`)
- Pandas (`pip install pandas`)
- Faker (`pip install faker`)

## Script Descriptions

### User Profile Generator

Generates realistic user profiles with randomized attributes like height, weight, fitness goals, etc.

```bash
cd FitTrack_MVP/2_data_collection/scripts
python generate_users.py --count 100 --output ../data/users.json
```

### Workout Log Generator

Creates synthetic workout logs including exercises, sets, reps, and weights.

```bash
cd FitTrack_MVP/2_data_collection/scripts
python generate_workouts.py --users ../data/users.json --output ../data/workouts.json
```

### Video Frame Generator

Produces sample frames that can be used to test the pose estimation functionality.

```bash
cd FitTrack_MVP/2_data_collection/scripts
python generate_video_frames.py --output ../data/pose_frames/
```

### Nutrition Log Generator

Creates sample nutrition entries with caloric and macronutrient information.

```bash
cd FitTrack_MVP/2_data_collection/scripts
python generate_nutrition.py --users ../data/users.json --output ../data/nutrition.json
```

## Data Format Specifications

### User Profile Format

```json
{
  "userId": "string",
  "name": "string",
  "email": "string",
  "height": number,  // in cm
  "weight": number,  // in kg
  "fitnessGoal": "string",  // e.g., "weight loss", "muscle gain", etc.
  "activityLevel": "string", // e.g., "sedentary", "moderate", "very active"
  "joinDate": "ISO date string"
}
```

### Workout Log Format

```json
{
  "workoutId": "string",
  "userId": "string",
  "date": "ISO date string",
  "duration": number,  // in minutes
  "exercises": [
    {
      "exerciseId": "string",
      "name": "string",
      "sets": [
        {
          "reps": number,
          "weight": number,  // in kg
          "duration": number  // in seconds, for timed exercises
        }
      ]
    }
  ],
  "caloriesBurned": number
}
```

### Video Frame Format

- Images are stored as PNG files
- Filenames follow the pattern: `exercise_variation_frame-number.png`
- Resolution: 640x480 pixels

### Nutrition Log Format

```json
{
  "entryId": "string",
  "userId": "string",
  "date": "ISO date string",
  "meals": [
    {
      "name": "string",  // e.g., "breakfast", "lunch", etc.
      "foods": [
        {
          "name": "string",
          "servingSize": number,
          "servingUnit": "string",
          "calories": number,
          "macros": {
            "protein": number,  // in grams
            "carbs": number,    // in grams
            "fat": number       // in grams
          }
        }
      ]
    }
  ],
  "totalCalories": number
}
```

## Adding Real Data

If you want to add your own real data to the system:

1. Format your data according to the specifications above
2. Place the files in the appropriate directories under `FitTrack_MVP/2_data_collection/data/`
3. Use the import tools in the scripts directory to load your data into the system:

```bash
cd FitTrack_MVP/2_data_collection/scripts
python import_data.py --type workouts --file your_workouts.json
```

## Troubleshooting

If you encounter issues with the data generation scripts:

1. Check that all dependencies are installed: `pip install -r requirements.txt`
2. Ensure output directories exist before running the scripts
3. For video frame generation issues, check that OpenCV is properly installed
4. For import errors with real data, verify that your data matches the required format 