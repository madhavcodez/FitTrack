import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addWorkout } from '../store/reducers/workoutReducer';
import axios from 'axios';

const WorkoutScreen = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutType, setWorkoutType] = useState('');
  const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '', weight: '' }]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '', weight: '' }]);
  };

  const updateExercise = (index: number, field: string, value: string) => {
    const newExercises = [...exercises];
    newExercises[index] = { ...newExercises[index], [field]: value };
    setExercises(newExercises);
  };

  const removeExercise = (index: number) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(newExercises);
  };

  const handleSubmit = async () => {
    if (!workoutName || !workoutType) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const formattedExercises = exercises.map(exercise => ({
      name: exercise.name,
      sets: parseInt(exercise.sets) || 0,
      reps: parseInt(exercise.reps) || 0,
      weight: exercise.weight ? parseInt(exercise.weight) : undefined,
    }));

    try {
      const response = await axios.post(
        'http://localhost:5000/api/workouts',
        {
          name: workoutName,
          type: workoutType,
          exercises: formattedExercises,
          duration: 30, // Default duration, can be made dynamic
          difficulty: 'intermediate', // Default difficulty, can be made dynamic
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(addWorkout(response.data));
      Alert.alert('Success', 'Workout logged successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to log workout');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Log Workout</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Workout Name"
          value={workoutName}
          onChangeText={setWorkoutName}
        />

        <TextInput
          style={styles.input}
          placeholder="Workout Type (strength, cardio, flexibility, hiit)"
          value={workoutType}
          onChangeText={setWorkoutType}
        />

        <Text style={styles.sectionTitle}>Exercises</Text>
        {exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseContainer}>
            <TextInput
              style={styles.input}
              placeholder="Exercise Name"
              value={exercise.name}
              onChangeText={(value) => updateExercise(index, 'name', value)}
            />
            <View style={styles.exerciseDetails}>
              <TextInput
                style={[styles.input, styles.smallInput]}
                placeholder="Sets"
                value={exercise.sets}
                onChangeText={(value) => updateExercise(index, 'sets', value)}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, styles.smallInput]}
                placeholder="Reps"
                value={exercise.reps}
                onChangeText={(value) => updateExercise(index, 'reps', value)}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, styles.smallInput]}
                placeholder="Weight (kg)"
                value={exercise.weight}
                onChangeText={(value) => updateExercise(index, 'weight', value)}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeExercise(index)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={addExercise}>
          <Text style={styles.addButtonText}>Add Exercise</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save Workout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6200ee',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  exerciseContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  exerciseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInput: {
    width: '30%',
  },
  removeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  removeButtonText: {
    color: '#ff4444',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WorkoutScreen; 