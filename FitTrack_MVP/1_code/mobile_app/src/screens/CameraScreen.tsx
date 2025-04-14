import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [score, setScore] = useState<number>(1);
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const route = useRoute();
  const { exerciseType } = route.params as { exerciseType: string };

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    setHasPermission(cameraPermission === 'authorized');
  };

  const captureFrame = async () => {
    if (camera.current) {
      try {
        setIsAnalyzing(true);
        const photo = await camera.current.takePhoto({
          qualityPrioritization: 'speed',
          skipMetadata: true,
        });

        // Convert image to base64
        const response = await fetch(`file://${photo.path}`);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          const base64data = reader.result?.toString().split(',')[1];
          
          // Send to AI service
          const aiResponse = await axios.post('http://localhost:5002/analyze_form', {
            image: base64data,
            exercise_type: exerciseType,
          });

          if (aiResponse.data.success) {
            setFeedback(aiResponse.data.feedback);
            setScore(aiResponse.data.score);
          } else {
            Alert.alert('Error', aiResponse.data.message);
          }
          setIsAnalyzing(false);
        };
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to capture image');
        setIsAnalyzing(false);
      }
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
      />
      
      <View style={styles.overlay}>
        {isAnalyzing ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <TouchableOpacity
            style={styles.captureButton}
            onPress={captureFrame}
          >
            <Text style={styles.captureButtonText}>Analyze Form</Text>
          </TouchableOpacity>
        )}
      </View>

      {feedback.length > 0 && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackTitle}>Form Analysis</Text>
          <Text style={styles.scoreText}>Score: {(score * 100).toFixed(0)}%</Text>
          {feedback.map((item, index) => (
            <Text key={index} style={styles.feedbackText}>
              • {item}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  captureButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedbackContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
  },
  feedbackTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  feedbackText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
});

export default CameraScreen; 