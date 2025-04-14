import cv2
import mediapipe as mp
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import json

app = Flask(__name__)
CORS(app)

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

def calculate_angle(a, b, c):
    """Calculate the angle between three points."""
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)
    
    if angle > 180.0:
        angle = 360-angle
        
    return angle

def analyze_squat(landmarks):
    """Analyze squat form using pose landmarks."""
    feedback = []
    score = 1.0
    
    # Get key points
    left_hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x,
                landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
    left_knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x,
                 landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
    left_ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
                  landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]
    
    # Calculate knee angle
    knee_angle = calculate_angle(left_hip, left_knee, left_ankle)
    
    # Check knee alignment
    if knee_angle < 90:
        feedback.append("Go deeper in your squat")
        score -= 0.2
    elif knee_angle > 120:
        feedback.append("Your squat is too shallow")
        score -= 0.1
    
    # Check knee tracking over toes
    if left_knee[0] < left_ankle[0]:
        feedback.append("Keep your knees behind your toes")
        score -= 0.3
    
    return feedback, max(0, score)

def analyze_pushup(landmarks):
    """Analyze pushup form using pose landmarks."""
    feedback = []
    score = 1.0
    
    # Get key points
    left_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                     landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
    left_elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                  landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
    left_wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                  landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
    
    # Calculate elbow angle
    elbow_angle = calculate_angle(left_shoulder, left_elbow, left_wrist)
    
    # Check elbow angle
    if elbow_angle < 90:
        feedback.append("Go lower in your pushup")
        score -= 0.2
    elif elbow_angle > 120:
        feedback.append("Your pushup is too shallow")
        score -= 0.1
    
    return feedback, max(0, score)

@app.route('/analyze_form', methods=['POST'])
def analyze_form():
    try:
        data = request.json
        image_data = base64.b64decode(data['image'])
        exercise_type = data['exercise_type']
        
        # Convert image data to numpy array
        nparr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Convert to RGB
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        # Process image with MediaPipe
        results = pose.process(image_rgb)
        
        if not results.pose_landmarks:
            return jsonify({
                'success': False,
                'message': 'No pose detected'
            })
        
        # Analyze form based on exercise type
        if exercise_type == 'squat':
            feedback, score = analyze_squat(results.pose_landmarks.landmark)
        elif exercise_type == 'pushup':
            feedback, score = analyze_pushup(results.pose_landmarks.landmark)
        else:
            return jsonify({
                'success': False,
                'message': 'Unsupported exercise type'
            })
        
        return jsonify({
            'success': True,
            'feedback': feedback,
            'score': score
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001) 