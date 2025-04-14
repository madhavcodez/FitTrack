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
import { colors, spacing, borderRadius, shadows } from '../constants/theme';

export default function LogWorkoutScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [type, setType] = useState('cardio');
  const [duration, setDuration] = useState('30');
  const [exercises, setExercises] = useState(['']);
  const [calories, setCalories] = useState('0');
  const [intensity, setIntensity] = useState('medium');
  const [completed, setCompleted] = useState(true);

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
    // Save workout log logic would go here
    // For now, just navigate back
    router.back();
  };

  // Estimate calories based on duration and intensity
  const calculateEstimatedCalories = () => {
    const durationNum = parseInt(duration, 10) || 0;
    let multiplier = 5; // default
    
    if (intensity === 'low') {
      multiplier = 4;
    } else if (intensity === 'medium') {
      multiplier = 7;
    } else if (intensity === 'high') {
      multiplier = 10;
    }
    
    return durationNum * multiplier;
  };

  const estimatedCalories = calculateEstimatedCalories();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>LOG WORKOUT</Text>
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
            placeholderTextColor={colors.text.tertiary}
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
            onChangeText={(text) => {
              setDuration(text);
              if (!isNaN(parseInt(text, 10))) {
                setCalories(calculateEstimatedCalories().toString());
              }
            }}
            placeholder="Enter duration"
            placeholderTextColor={colors.text.tertiary}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Intensity</Text>
          <View style={styles.typeButtons}>
            {['low', 'medium', 'high'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.typeButton,
                  intensity === item && styles.typeButtonActive,
                ]}
                onPress={() => {
                  setIntensity(item);
                  // Auto-calculate calories when intensity changes
                  setCalories(calculateEstimatedCalories().toString());
                }}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    intensity === item && styles.typeButtonTextActive,
                  ]}
                >
                  {item.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Calories Burned</Text>
          <View style={styles.calorieInputContainer}>
            <TextInput
              style={styles.calorieInput}
              value={calories}
              onChangeText={setCalories}
              placeholder="Calories burned"
              placeholderTextColor={colors.text.tertiary}
              keyboardType="numeric"
            />
            <View style={styles.estimatedContainer}>
              <Text style={styles.estimatedLabel}>ESTIMATED: {estimatedCalories}</Text>
              <TouchableOpacity 
                style={styles.useEstimatedButton}
                onPress={() => setCalories(estimatedCalories.toString())}
              >
                <Text style={styles.useEstimatedText}>USE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.formGroup}>
          <View style={styles.exercisesHeader}>
            <Text style={styles.label}>Exercises</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
              <Ionicons name="add-circle" size={24} color={colors.primary} />
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
                placeholderTextColor={colors.text.tertiary}
              />
              {exercises.length > 1 && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveExercise(index)}
                >
                  <Ionicons name="close-circle" size={22} color={colors.text.tertiary} />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <View style={styles.formGroup}>
          <View style={styles.completedContainer}>
            <Text style={styles.label}>Mark as Completed</Text>
            <Switch
              value={completed}
              onValueChange={setCompleted}
              trackColor={{ false: colors.border.default, true: colors.primary }}
              thumbColor={completed ? colors.text.primary : '#f4f3f4'}
            />
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
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: colors.background.input,
    borderRadius: borderRadius.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.text.primary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  calorieInputContainer: {
    marginBottom: 8,
  },
  calorieInput: {
    backgroundColor: colors.background.input,
    borderRadius: borderRadius.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.text.primary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border.default,
    marginBottom: 8,
  },
  estimatedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  estimatedLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  useEstimatedButton: {
    backgroundColor: colors.background.card,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  useEstimatedText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 1,
    backgroundColor: colors.background.input,
    paddingVertical: 12,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeButtonText: {
    color: colors.text.secondary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  typeButtonTextActive: {
    color: colors.text.primary,
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
    color: colors.primary,
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
    backgroundColor: colors.background.input,
    borderRadius: borderRadius.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.text.primary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  removeButton: {
    marginLeft: 10,
  },
  completedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    padding: 20,
    backgroundColor: colors.background.darker,
    borderTopWidth: 1,
    borderTopColor: colors.border.default,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.text.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 