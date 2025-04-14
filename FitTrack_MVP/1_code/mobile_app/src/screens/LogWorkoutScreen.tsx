import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, spacing, borderRadius } from '../constants/theme';

// Dummy data for exercise selection
const exerciseOptions = [
  { id: '1', name: 'Bench Press', category: 'Chest', isSelected: false },
  { id: '2', name: 'Squat', category: 'Legs', isSelected: false },
  { id: '3', name: 'Deadlift', category: 'Back', isSelected: false },
  { id: '4', name: 'Pull-ups', category: 'Back', isSelected: false },
  { id: '5', name: 'Shoulder Press', category: 'Shoulders', isSelected: false },
  { id: '6', name: 'Bicep Curls', category: 'Arms', isSelected: false },
  { id: '7', name: 'Tricep Extensions', category: 'Arms', isSelected: false },
  { id: '8', name: 'Leg Press', category: 'Legs', isSelected: false },
  { id: '9', name: 'Lat Pulldown', category: 'Back', isSelected: false },
  { id: '10', name: 'Leg Curls', category: 'Legs', isSelected: false },
];

type Exercise = {
  id: string;
  name: string;
  category: string;
  isSelected: boolean;
  sets?: Array<{
    reps: string;
    weight: string;
  }>;
};

export default function LogWorkoutScreen() {
  const navigation = useNavigation();
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>(exerciseOptions);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [useAI, setUseAI] = useState(true);

  const toggleExerciseSelection = (id: string) => {
    const updatedExercises = exercises.map(exercise => {
      if (exercise.id === id) {
        return {
          ...exercise,
          isSelected: !exercise.isSelected,
        };
      }
      return exercise;
    });
    
    setExercises(updatedExercises);
    
    const newSelectedExercises = updatedExercises
      .filter(exercise => exercise.isSelected)
      .map(exercise => ({
        ...exercise,
        sets: [{ reps: '', weight: '' }], // Initialize with one empty set
      }));
    
    setSelectedExercises(newSelectedExercises);
  };

  const addSet = (exerciseId: string) => {
    setSelectedExercises(prev => 
      prev.map(exercise => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: [...(exercise.sets || []), { reps: '', weight: '' }],
          };
        }
        return exercise;
      })
    );
  };

  const removeSet = (exerciseId: string, setIndex: number) => {
    setSelectedExercises(prev => 
      prev.map(exercise => {
        if (exercise.id === exerciseId && exercise.sets && exercise.sets.length > 1) {
          const newSets = [...exercise.sets];
          newSets.splice(setIndex, 1);
          return {
            ...exercise,
            sets: newSets,
          };
        }
        return exercise;
      })
    );
  };

  const updateSetValue = (exerciseId: string, setIndex: number, field: 'reps' | 'weight', value: string) => {
    setSelectedExercises(prev => 
      prev.map(exercise => {
        if (exercise.id === exerciseId && exercise.sets) {
          const newSets = [...exercise.sets];
          newSets[setIndex] = {
            ...newSets[setIndex],
            [field]: value,
          };
          return {
            ...exercise,
            sets: newSets,
          };
        }
        return exercise;
      })
    );
  };

  const logWorkout = () => {
    if (!workoutName.trim()) {
      Alert.alert('Missing Information', 'Please enter a workout name');
      return;
    }
    
    if (selectedExercises.length === 0) {
      Alert.alert('Missing Information', 'Please select at least one exercise');
      return;
    }
    
    // Basic validation for all sets having values
    const isValid = selectedExercises.every(exercise => 
      exercise.sets?.every(set => 
        set.reps.trim() !== '' && set.weight.trim() !== ''
      )
    );
    
    if (!isValid) {
      Alert.alert('Missing Information', 'Please fill in all reps and weights for your sets');
      return;
    }
    
    // Here you would typically save the workout to your backend
    // For now, we'll just simulate success and navigate back
    
    Alert.alert(
      'Workout Logged',
      'Your workout has been saved successfully!',
      [
        { 
          text: 'OK', 
          onPress: () => navigation.goBack() 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>LOG WORKOUT</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Workout Name Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Morning Chest Workout"
            placeholderTextColor={colors.text.secondary}
            value={workoutName}
            onChangeText={setWorkoutName}
          />
        </View>

        {/* Exercise Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Exercises</Text>
          <View style={styles.exerciseList}>
            {exercises.map(exercise => (
              <TouchableOpacity
                key={exercise.id}
                style={[
                  styles.exerciseItem,
                  exercise.isSelected && styles.exerciseItemSelected
                ]}
                onPress={() => toggleExerciseSelection(exercise.id)}
              >
                <View style={styles.exerciseItemContent}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseCategory}>{exercise.category}</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  {exercise.isSelected ? (
                    <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                  ) : (
                    <Ionicons name="ellipse-outline" size={24} color={colors.text.secondary} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sets and Reps for Selected Exercises */}
        {selectedExercises.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sets and Reps</Text>
            
            {selectedExercises.map(exercise => (
              <View key={exercise.id} style={styles.exerciseSetContainer}>
                <Text style={styles.exerciseSetTitle}>{exercise.name}</Text>
                
                {exercise.sets?.map((set, index) => (
                  <View key={index} style={styles.setRow}>
                    <Text style={styles.setNumber}>Set {index + 1}</Text>
                    
                    <View style={styles.setInputContainer}>
                      <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Reps</Text>
                        <TextInput
                          style={styles.setInput}
                          keyboardType="number-pad"
                          value={set.reps}
                          onChangeText={value => updateSetValue(exercise.id, index, 'reps', value)}
                          placeholder="0"
                          placeholderTextColor={colors.text.secondary}
                        />
                      </View>
                      
                      <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Weight (kg)</Text>
                        <TextInput
                          style={styles.setInput}
                          keyboardType="decimal-pad"
                          value={set.weight}
                          onChangeText={value => updateSetValue(exercise.id, index, 'weight', value)}
                          placeholder="0.0"
                          placeholderTextColor={colors.text.secondary}
                        />
                      </View>
                      
                      {index > 0 && (
                        <TouchableOpacity
                          style={styles.removeSetButton}
                          onPress={() => removeSet(exercise.id, index)}
                        >
                          <Ionicons name="trash-outline" size={20} color={colors.status.error} />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
                
                <TouchableOpacity
                  style={styles.addSetButton}
                  onPress={() => addSet(exercise.id)}
                >
                  <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
                  <Text style={styles.addSetText}>Add Set</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* AI Form Analysis Toggle */}
        <View style={styles.section}>
          <View style={styles.toggleContainer}>
            <View>
              <Text style={styles.toggleTitle}>AI Form Analysis</Text>
              <Text style={styles.toggleDescription}>Use camera to check your exercise form</Text>
            </View>
            <Switch
              value={useAI}
              onValueChange={setUseAI}
              trackColor={{ false: colors.border.default, true: colors.primary }}
              thumbColor={useAI ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Log Workout Button */}
        <TouchableOpacity
          style={styles.logButton}
          onPress={logWorkout}
        >
          <Text style={styles.logButtonText}>LOG WORKOUT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: colors.background.darker,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
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
    color: colors.text.primary,
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: colors.background.input,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    color: colors.text.primary,
    fontSize: 16,
  },
  exerciseList: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  exerciseItemSelected: {
    backgroundColor: `${colors.primary}22`, // Adding some transparency
  },
  exerciseItemContent: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  exerciseCategory: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  checkboxContainer: {
    marginLeft: spacing.md,
  },
  exerciseSetContainer: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  exerciseSetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  setRow: {
    marginBottom: spacing.md,
  },
  setNumber: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  setInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputGroup: {
    flex: 1,
    marginRight: spacing.md,
  },
  inputLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  setInput: {
    backgroundColor: colors.background.input,
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
    color: colors.text.primary,
    fontSize: 16,
    textAlign: 'center',
  },
  removeSetButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addSetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  addSetText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  logButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 