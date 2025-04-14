import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, typography } from '../constants/theme';
import globalStyles from '../constants/globalStyles';
import { LinearGradient } from 'expo-linear-gradient';

type GoalType = 'weight_loss' | 'muscle_gain' | 'endurance' | 'flexibility' | 'custom';

interface WorkoutDay {
  day: string;
  exercises: string[];
  active: boolean;
}

export default function CreatePlanScreen() {
  const router = useRouter();
  const [planName, setPlanName] = useState('');
  const [goal, setGoal] = useState<GoalType>('weight_loss');
  const [duration, setDuration] = useState('4');
  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([
    { day: 'Monday', exercises: [], active: true },
    { day: 'Tuesday', exercises: [], active: false },
    { day: 'Wednesday', exercises: [], active: true },
    { day: 'Thursday', exercises: [], active: false },
    { day: 'Friday', exercises: [], active: true },
    { day: 'Saturday', exercises: [], active: false },
    { day: 'Sunday', exercises: [], active: false },
  ]);
  const [showAIRecommendations, setShowAIRecommendations] = useState(true);
  
  const toggleWorkoutDay = (dayIndex: number) => {
    const updatedWorkoutDays = [...workoutDays];
    updatedWorkoutDays[dayIndex].active = !updatedWorkoutDays[dayIndex].active;
    setWorkoutDays(updatedWorkoutDays);
  };
  
  const createPlan = () => {
    if (!planName) {
      Alert.alert('Missing Information', 'Please enter a plan name');
      return;
    }
    
    // Here we would typically save the plan data
    Alert.alert(
      'Plan Created', 
      `Your ${planName} plan has been created successfully!`,
      [
        { 
          text: 'View Plan', 
          onPress: () => router.push('/')
        }
      ]
    );
  };
  
  const selectGoal = (selectedGoal: GoalType) => {
    setGoal(selectedGoal);
    
    // Preset workout days based on goal
    let presetDays = [...workoutDays];
    
    if (selectedGoal === 'weight_loss') {
      presetDays = presetDays.map(day => ({
        ...day,
        active: ['Monday', 'Wednesday', 'Friday', 'Saturday'].includes(day.day)
      }));
    } else if (selectedGoal === 'muscle_gain') {
      presetDays = presetDays.map(day => ({
        ...day,
        active: ['Monday', 'Tuesday', 'Thursday', 'Friday'].includes(day.day)
      }));
    } else if (selectedGoal === 'endurance') {
      presetDays = presetDays.map(day => ({
        ...day,
        active: ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Sunday'].includes(day.day)
      }));
    } else if (selectedGoal === 'flexibility') {
      presetDays = presetDays.map(day => ({
        ...day,
        active: ['Monday', 'Wednesday', 'Friday'].includes(day.day)
      }));
    }
    
    setWorkoutDays(presetDays);
  };
  
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      {/* Top Navigation Bar */}
      <View style={globalStyles.topBar}>
        <TouchableOpacity style={globalStyles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={globalStyles.headerTitle}>CREATE PLAN</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView style={globalStyles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.iconContainer}
          >
            <Ionicons name="calendar" size={32} color={colors.text.primary} />
          </LinearGradient>
          <Text style={globalStyles.title}>Workout Plan Builder</Text>
          <Text style={globalStyles.subtitle}>
            Create your personalized workout plan tailored to your fitness goals
          </Text>
        </View>
        
        {/* Plan Name Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plan Name</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Enter plan name"
            placeholderTextColor={colors.text.tertiary}
            value={planName}
            onChangeText={setPlanName}
          />
        </View>
        
        {/* Fitness Goal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fitness Goal</Text>
          <View style={styles.goalOptions}>
            <TouchableOpacity 
              style={[
                styles.goalOption, 
                goal === 'weight_loss' && styles.goalOptionActive
              ]}
              onPress={() => selectGoal('weight_loss')}
            >
              <Ionicons 
                name="trending-down" 
                size={24} 
                color={goal === 'weight_loss' ? colors.text.primary : colors.text.secondary} 
              />
              <Text style={[
                styles.goalText, 
                goal === 'weight_loss' && styles.goalTextActive
              ]}>
                Weight Loss
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.goalOption, 
                goal === 'muscle_gain' && styles.goalOptionActive
              ]}
              onPress={() => selectGoal('muscle_gain')}
            >
              <Ionicons 
                name="barbell" 
                size={24} 
                color={goal === 'muscle_gain' ? colors.text.primary : colors.text.secondary} 
              />
              <Text style={[
                styles.goalText, 
                goal === 'muscle_gain' && styles.goalTextActive
              ]}>
                Muscle Gain
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.goalOption, 
                goal === 'endurance' && styles.goalOptionActive
              ]}
              onPress={() => selectGoal('endurance')}
            >
              <Ionicons 
                name="heart" 
                size={24} 
                color={goal === 'endurance' ? colors.text.primary : colors.text.secondary} 
              />
              <Text style={[
                styles.goalText, 
                goal === 'endurance' && styles.goalTextActive
              ]}>
                Endurance
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.goalOption, 
                goal === 'flexibility' && styles.goalOptionActive
              ]}
              onPress={() => selectGoal('flexibility')}
            >
              <Ionicons 
                name="body" 
                size={24} 
                color={goal === 'flexibility' ? colors.text.primary : colors.text.secondary} 
              />
              <Text style={[
                styles.goalText, 
                goal === 'flexibility' && styles.goalTextActive
              ]}>
                Flexibility
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Plan Duration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plan Duration (weeks)</Text>
          <View style={styles.durationContainer}>
            <TouchableOpacity 
              style={styles.durationButton}
              onPress={() => setDuration(prev => Math.max(1, parseInt(prev) - 1).toString())}
            >
              <Ionicons name="remove" size={24} color={colors.text.secondary} />
            </TouchableOpacity>
            
            <TextInput
              style={styles.durationInput}
              value={duration}
              onChangeText={text => {
                if (/^\d*$/.test(text)) {
                  setDuration(text);
                }
              }}
              keyboardType="number-pad"
              maxLength={2}
              placeholderTextColor={colors.text.tertiary}
            />
            
            <TouchableOpacity 
              style={styles.durationButton}
              onPress={() => setDuration(prev => (parseInt(prev) + 1).toString())}
            >
              <Ionicons name="add" size={24} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Workout Days */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Days</Text>
          <View style={styles.workoutDaysContainer}>
            {workoutDays.map((day, index) => (
              <TouchableOpacity
                key={day.day}
                style={[
                  styles.workoutDay,
                  day.active && styles.workoutDayActive
                ]}
                onPress={() => toggleWorkoutDay(index)}
              >
                <Ionicons
                  name={day.active ? "checkmark-circle" : "ellipse-outline"}
                  size={22}
                  color={day.active ? colors.primary : colors.text.secondary}
                  style={styles.workoutDayIcon}
                />
                <Text style={[
                  styles.workoutDayText,
                  day.active && styles.workoutDayTextActive
                ]}>
                  {day.day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* AI Recommendations */}
        <View style={styles.section}>
          <View style={styles.aiHeader}>
            <Text style={styles.sectionTitle}>AI Recommendations</Text>
            <Switch
              value={showAIRecommendations}
              onValueChange={setShowAIRecommendations}
              trackColor={{ false: colors.background.card, true: `${colors.primary}88` }}
              thumbColor={showAIRecommendations ? colors.primary : colors.text.tertiary}
            />
          </View>
          
          <View style={styles.aiInfoContainer}>
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.aiIconContainer}
            >
              <Ionicons name="sparkles" size={24} color="#fff" />
            </LinearGradient>
            <Text style={styles.aiInfoText}>
              {showAIRecommendations 
                ? "AI will suggest exercises and intensity based on your goals and experience level"
                : "Turn on AI recommendations to get personalized exercise suggestions"}
            </Text>
          </View>
        </View>
        
        {/* Create Plan Button */}
        <TouchableOpacity 
          style={globalStyles.primaryButton} 
          onPress={createPlan}
        >
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.gradientButton}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
              <Text style={globalStyles.primaryButtonText}>CREATE PLAN</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            You can edit your plan anytime after creation. All workout plans can be modified to match your progress.
          </Text>
        </View>
      </ScrollView>
      
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.medium,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  goalOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  goalOption: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    width: '48%',
    marginBottom: spacing.md,
    alignItems: 'center',
    ...shadows.small,
  },
  goalOptionActive: {
    backgroundColor: colors.primary,
  },
  goalText: {
    color: colors.text.secondary,
    fontWeight: 'bold',
    marginTop: spacing.xs,
  },
  goalTextActive: {
    color: colors.text.primary,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationButton: {
    backgroundColor: colors.background.card,
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.small,
  },
  durationInput: {
    backgroundColor: colors.background.card,
    color: colors.text.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    width: 80,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    ...shadows.small,
  },
  workoutDaysContainer: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.small,
  },
  workoutDay: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  workoutDayActive: {
    borderBottomColor: colors.border.default,
  },
  workoutDayIcon: {
    marginRight: spacing.sm,
  },
  workoutDayText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  workoutDayTextActive: {
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  aiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  aiInfoContainer: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.small,
  },
  aiIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  aiInfoText: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disclaimer: {
    marginVertical: spacing.lg,
    padding: spacing.md,
  },
  disclaimerText: {
    fontSize: 12,
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 18,
  },
  gradientButton: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
}); 