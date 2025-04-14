import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddWorkoutScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [type, setType] = useState('cardio');
  const [duration, setDuration] = useState('30');
  const [exercises, setExercises] = useState(['']);
  const [difficulty, setDifficulty] = useState('medium');

  const handleAddExercise = () => {
    setExercises([...exercises, '']);
  };

  const handleExerciseChange = (text: string, index: number) => {
    const newExercises = [...exercises];
    newExercises[index] = text;
    setExercises(newExercises);
  };

  const handleRemoveExercise = (index: number) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  const handleSave = () => {
    // Save workout logic would go here
    // For now, just navigate back
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>ADD WORKOUT</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Workout Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter workout name"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Type</Text>
          <View style={styles.typeButtons}>
            {['cardio', 'strength', 'flexibility'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.typeButton,
                  type === item && styles.typeButtonActive,
                ]}
                onPress={() => setType(item)}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    type === item && styles.typeButtonTextActive,
                  ]}
                >
                  {item.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Duration (minutes)</Text>
          <TextInput
            style={styles.input}
            value={duration}
            onChangeText={setDuration}
            placeholder="Enter duration"
            placeholderTextColor="#666"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <View style={styles.exercisesHeader}>
            <Text style={styles.label}>Exercises</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
              <Ionicons name="add-circle" size={24} color="#00C3A3" />
              <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>
          </View>

          {exercises.map((exercise, index) => (
            <View key={index} style={styles.exerciseRow}>
              <TextInput
                style={styles.exerciseInput}
                value={exercise}
                onChangeText={(text) => handleExerciseChange(text, index)}
                placeholder="Enter exercise name"
                placeholderTextColor="#666"
              />
              {exercises.length > 1 && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveExercise(index)}
                >
                  <Ionicons name="close-circle" size={22} color="#666" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Difficulty</Text>
          <View style={styles.typeButtons}>
            {['easy', 'medium', 'hard'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.typeButton,
                  difficulty === item && styles.typeButtonActive,
                ]}
                onPress={() => setDifficulty(item)}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    difficulty === item && styles.typeButtonTextActive,
                  ]}
                >
                  {item.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>SAVE WORKOUT</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#1A1A1A',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#1D1D1D',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 1,
    backgroundColor: '#1D1D1D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#333',
  },
  typeButtonActive: {
    backgroundColor: '#00C3A3',
    borderColor: '#00C3A3',
  },
  typeButtonText: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 12,
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  exercisesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#00C3A3',
    marginLeft: 4,
    fontWeight: 'bold',
    fontSize: 12,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseInput: {
    flex: 1,
    backgroundColor: '#1D1D1D',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  removeButton: {
    marginLeft: 10,
  },
  footer: {
    padding: 20,
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  saveButton: {
    backgroundColor: '#00C3A3',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 