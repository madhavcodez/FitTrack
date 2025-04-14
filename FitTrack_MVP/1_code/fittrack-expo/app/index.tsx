import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, typography } from '../constants/theme';

const { width } = Dimensions.get('window');

// Define valid icon names for TypeScript type checking
type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface Feature {
  id: string;
  name: string;
  icon: IconName;
  action: () => void;
  description: string;
}

export default function MainScreen() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [aiStatus, setAiStatus] = useState('Checking...');
  const [workouts, setWorkouts] = useState([
    {
      _id: '1',
      name: 'Morning Cardio',
      type: 'cardio',
      exercises: ['Running', 'Jumping Jacks', 'Burpees'],
      duration: 30,
      date: new Date().toISOString(),
      calories: 320,
      difficulty: 'medium'
    },
    {
      _id: '2',
      name: 'Strength Training',
      type: 'strength',
      exercises: ['Bench Press', 'Squats', 'Deadlifts'],
      duration: 45,
      date: new Date().toISOString(),
      calories: 450,
      difficulty: 'hard'
    }
  ]);
  const [meals, setMeals] = useState([
    {
      _id: '1',
      name: 'Breakfast',
      foods: ['Oatmeal', 'Banana', 'Protein Shake'],
      time: '07:30',
      calories: 450,
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [caloriesConsumed, setCaloriesConsumed] = useState(1050);
  const [caloriesBurned, setCaloriesBurned] = useState(750);
  const [calorieGoal, setCalorieGoal] = useState(2000);

  // Check server status on app load
  useEffect(() => {
    checkApiStatus();
    checkAiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch('http://10.0.2.2:5001/health', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (response.ok) {
        setApiStatus('Online ✅');
      } else {
        setApiStatus('Error ❌');
      }
    } catch (error) {
      setApiStatus('Offline ❌');
    }
  };

  const checkAiStatus = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch('http://10.0.2.2:5002/health', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (response.ok) {
        setAiStatus('Online ✅');
      } else {
        setAiStatus('Error ❌');
      }
    } catch (error) {
      setAiStatus('Offline ❌');
    }
  };

  const navigateToAddWorkout = () => {
    router.push('/add-workout');
  };

  const navigateToLogWorkout = () => {
    router.push('/log-workout');
  };

  const navigateToAddFood = () => {
    router.push('/add-food');
  };

  const navigateToAnalyzeForm = () => {
    router.push('/analyze-form');
  };

  const navigateToOptimizeWorkout = () => {
    router.push('/optimize');
  };

  // Calculate remaining calories
  const remainingCalories = calorieGoal - caloriesConsumed + caloriesBurned;
  const calorieProgress = (caloriesConsumed / calorieGoal) * 100;

  const features: Feature[] = [
    { 
      id: 'log-workout', 
      name: 'LOG WORKOUT', 
      icon: 'fitness-outline', 
      action: navigateToLogWorkout,
      description: 'Record your exercises' 
    },
    { 
      id: 'add-food', 
      name: 'LOG FOOD', 
      icon: 'restaurant-outline', 
      action: navigateToAddFood,
      description: 'Track your meals'
    },
    { 
      id: 'analyze-form', 
      name: 'ANALYZE FORM', 
      icon: 'analytics-outline', 
      action: navigateToAnalyzeForm,
      description: 'Improve technique'
    },
    { 
      id: 'add-workout', 
      name: 'CREATE PLAN', 
      icon: 'add-circle-outline', 
      action: navigateToAddWorkout,
      description: 'Design a routine'
    },
    { 
      id: 'optimize', 
      name: 'OPTIMIZE', 
      icon: 'trending-up-outline', 
      action: navigateToOptimizeWorkout,
      description: 'AI recommendations'
    },
    { 
      id: 'goals', 
      name: 'GOALS', 
      icon: 'trophy-outline', 
      action: () => {},
      description: 'Set fitness targets'
    },
  ];

  // Create animated styles for the scrolling indicator
  const summaryIndicatorOpacity = scrollY.interpolate({
    inputRange: [0, 100, 150],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  const summaryIndicatorTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [10, 0],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Text style={styles.titleLogo}>FIT<Text style={styles.titleLogoAccent}>TRACK</Text></Text>
          <Text style={styles.titleTagline}>trAIn smart, achieve more</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Calorie Summary */}
      <View style={styles.calorieContainer}>
        <View style={styles.calorieHeader}>
          <Text style={styles.calorieTitle}>Daily Calories</Text>
          <Text style={styles.calorieGoal}>{calorieGoal} GOAL</Text>
        </View>
        
        <View style={styles.calorieProgressContainer}>
          <View style={styles.calorieProgressBar}>
            <View 
              style={[
                styles.calorieProgressFill, 
                { width: `${Math.min(calorieProgress, 100)}%` },
                calorieProgress > 100 && styles.calorieProgressOverage
              ]} 
            />
          </View>
          <Text style={styles.calorieRemaining}>
            {remainingCalories > 0 ? `${remainingCalories} REMAINING` : 'GOAL REACHED'}
          </Text>
        </View>
        
        <View style={styles.calorieDetails}>
          <View style={styles.calorieItem}>
            <Text style={styles.calorieValue}>{caloriesConsumed}</Text>
            <Text style={styles.calorieLabel}>CONSUMED</Text>
          </View>
          
          <View style={styles.calorieDivider} />
          
          <View style={styles.calorieItem}>
            <Text style={styles.calorieValue}>{caloriesBurned}</Text>
            <Text style={styles.calorieLabel}>BURNED</Text>
          </View>
        </View>
      </View>
      
      {/* Features Grid */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>FEATURES</Text>
      </View>
      
      <View style={styles.featuresGrid}>
        {features.map((feature) => (
          <TouchableOpacity 
            key={feature.id}
            style={styles.featureItem}
            onPress={feature.action}
          >
            <View style={styles.featureIconContainer}>
              <Ionicons name={feature.icon} size={28} color={colors.primary} />
            </View>
            <Text style={styles.featureName}>{feature.name}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Today's Plan Section with sticky header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>TODAY'S SUMMARY</Text>
        <Animated.View 
          style={[
            styles.scrollIndicator, 
            {
              opacity: summaryIndicatorOpacity,
              transform: [{ translateY: summaryIndicatorTranslateY }]
            }
          ]}
        >
          <Ionicons name="chevron-down" size={20} color={colors.primary} />
        </Animated.View>
      </View>
      
      {/* Scrollable Content with onScroll event */}
      <Animated.ScrollView 
        style={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Workouts List */}
        <View style={styles.subsectionHeader}>
          <Text style={styles.subsectionTitle}>Workouts</Text>
          <TouchableOpacity onPress={navigateToLogWorkout}>
            <Text style={styles.subsectionAction}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>
        
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <TouchableOpacity 
              key={workout._id} 
              style={styles.summaryCard}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.cardTitle}>{workout.name}</Text>
                  <View style={styles.tagContainer}>
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>{workout.type}</Text>
                    </View>
                    <Text style={styles.metaText}>{workout.duration} min</Text>
                  </View>
                </View>
                <View style={styles.metricContainer}>
                  <Text style={styles.metricValue}>{workout.calories}</Text>
                  <Text style={styles.metricLabel}>cal</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="fitness-outline" size={24} color={colors.text.tertiary} />
            <Text style={styles.emptyStateText}>No workouts logged today</Text>
          </View>
        )}

        {/* Meals List */}
        <View style={styles.subsectionHeader}>
          <Text style={styles.subsectionTitle}>Meals</Text>
          <TouchableOpacity onPress={navigateToAddFood}>
            <Text style={styles.subsectionAction}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>
        
        {meals.length > 0 ? (
          meals.map((meal) => (
            <TouchableOpacity 
              key={meal._id} 
              style={styles.summaryCard}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.cardTitle}>{meal.name}</Text>
                  <View style={styles.tagContainer}>
                    <View style={[styles.tag, styles.mealTag]}>
                      <Text style={[styles.tagText, styles.mealTagText]}>{meal.time}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.metricContainer}>
                  <Text style={styles.metricValue}>{meal.calories}</Text>
                  <Text style={styles.metricLabel}>cal</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={24} color={colors.text.tertiary} />
            <Text style={styles.emptyStateText}>No meals logged today</Text>
          </View>
        )}
        
        {/* Extra space at bottom */}
        <View style={styles.scrollFooter} />
      </Animated.ScrollView>
      
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>API: {apiStatus} • AI: {aiStatus}</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
    ...shadows.small,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLogo: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text.primary,
    letterSpacing: typography.letterSpacing.wider,
    textShadowColor: 'rgba(124, 77, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  titleLogoAccent: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: typography.letterSpacing.wider,
    textShadowColor: 'rgba(124, 77, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  titleTagline: {
    fontSize: 10,
    color: colors.text.secondary,
    letterSpacing: typography.letterSpacing.wide,
    marginTop: 2,
  },
  calorieContainer: {
    backgroundColor: colors.background.card,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: borderRadius.md,
    ...shadows.small,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  calorieHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  calorieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  calorieGoal: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  calorieProgressContainer: {
    marginBottom: 16,
  },
  calorieProgressBar: {
    height: 8,
    backgroundColor: colors.border.default,
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  calorieProgressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  calorieProgressOverage: {
    backgroundColor: colors.status.error,
  },
  calorieRemaining: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'right',
  },
  calorieDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  calorieItem: {
    alignItems: 'center',
  },
  calorieValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  calorieLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    letterSpacing: 0.5,
  },
  calorieDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border.default,
  },
  sectionHeader: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.background.dark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    letterSpacing: 0.5,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md / 2,
    paddingBottom: spacing.md,
  },
  featureItem: {
    width: (width - spacing.md * 3) / 2,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    margin: spacing.md / 2,
    ...shadows.small,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: `${colors.primary}22`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.small,
  },
  featureName: {
    color: colors.text.primary,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  featureDescription: {
    color: colors.text.secondary,
    fontSize: 12,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  subsectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  subsectionAction: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: 'bold',
  },
  summaryCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
    borderLeftWidth: 2,
    borderLeftColor: colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: colors.background.input,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  mealTag: {
    backgroundColor: colors.border.mealTag,
  },
  tagText: {
    fontSize: 10,
    color: colors.primary,
    textTransform: 'uppercase',
  },
  mealTagText: {
    color: colors.secondary,
  },
  metaText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  metricContainer: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  emptyState: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.xl,
    marginBottom: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border.default,
    borderStyle: 'dashed',
  },
  emptyStateText: {
    color: colors.text.tertiary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  scrollFooter: {
    height: spacing.xxl,
  },
  scrollIndicator: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: `${colors.primary}33`,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.background.darker,
    borderTopWidth: 1,
    borderTopColor: colors.border.default,
  },
  statusText: {
    fontSize: 10,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
}); 