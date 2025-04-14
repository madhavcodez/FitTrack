import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Switch,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, typography } from '../constants/theme';

export default function OptimizeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [includeWorkouts, setIncludeWorkouts] = useState(true);
  const [includeDiet, setIncludeDiet] = useState(true);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  
  const generateRecommendations = () => {
    if (!includeWorkouts && !includeDiet) {
      return;
    }
    
    setLoading(true);
    setRecommendation(null);
    
    // Simulate API call delay
    setTimeout(() => {
      let recommendationText = '';
      
      if (includeWorkouts && includeDiet) {
        recommendationText = 
          "Based on your recent activity and diet patterns, we recommend:\n\n" +
          "🏋️ WORKOUT RECOMMENDATIONS:\n" +
          "• Increase strength training to 3x weekly\n" +
          "• Add 15 minutes of active recovery after workouts\n" +
          "• Focus on progressive overload for bench press and squats\n" +
          "• Consider adding one HIIT session per week\n\n" +
          "🍽️ NUTRITION RECOMMENDATIONS:\n" +
          "• Increase protein intake to 1.6g per kg of bodyweight\n" +
          "• Add 2 servings of green vegetables daily\n" +
          "• Consume complex carbs 1-2 hours before workouts\n" +
          "• Consider intermittent fasting (16:8) on rest days";
      } else if (includeWorkouts) {
        recommendationText = 
          "Based on your recent activity patterns, we recommend:\n\n" +
          "🏋️ WORKOUT RECOMMENDATIONS:\n" +
          "• Increase strength training to 3x weekly\n" +
          "• Add 15 minutes of active recovery after workouts\n" +
          "• Focus on progressive overload for bench press and squats\n" +
          "• Consider adding one HIIT session per week\n" +
          "• Improve recovery with 10 minute stretching routine\n" +
          "• Add one flexibility-focused session weekly";
      } else {
        recommendationText = 
          "Based on your recent diet patterns, we recommend:\n\n" +
          "🍽️ NUTRITION RECOMMENDATIONS:\n" +
          "• Increase protein intake to 1.6g per kg of bodyweight\n" +
          "• Add 2 servings of green vegetables daily\n" +
          "• Consume complex carbs 1-2 hours before workouts\n" +
          "• Consider intermittent fasting (16:8) on rest days\n" +
          "• Increase water intake to 3L daily\n" +
          "• Add omega-3 rich foods 2-3 times per week";
      }
      
      setRecommendation(recommendationText);
      setLoading(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>OPTIMIZE</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="trending-up" size={32} color={colors.primary} />
          </View>
          <Text style={styles.headerTitle}>AI Recommendations</Text>
          <Text style={styles.headerSubtitle}>
            Get personalized suggestions to improve your fitness journey
          </Text>
        </View>

        <View style={styles.optionsCard}>
          <Text style={styles.cardTitle}>Optimization Options</Text>
          
          <View style={styles.optionRow}>
            <View>
              <Text style={styles.optionTitle}>Workout Recommendations</Text>
              <Text style={styles.optionDescription}>Optimize exercise selection and programming</Text>
            </View>
            <Switch
              value={includeWorkouts}
              onValueChange={setIncludeWorkouts}
              trackColor={{ false: colors.border.default, true: colors.primary }}
              thumbColor={includeWorkouts ? '#fff' : '#f4f3f4'}
              ios_backgroundColor={colors.border.default}
            />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.optionRow}>
            <View>
              <Text style={styles.optionTitle}>Nutrition Recommendations</Text>
              <Text style={styles.optionDescription}>Optimize diet and meal timing</Text>
            </View>
            <Switch
              value={includeDiet}
              onValueChange={setIncludeDiet}
              trackColor={{ false: colors.border.default, true: colors.primary }}
              thumbColor={includeDiet ? '#fff' : '#f4f3f4'}
              ios_backgroundColor={colors.border.default}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={[
            styles.generateButton,
            (!includeWorkouts && !includeDiet) && styles.generateButtonDisabled
          ]}
          onPress={generateRecommendations}
          disabled={loading || (!includeWorkouts && !includeDiet)}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={styles.buttonContent}>
              <Ionicons name="flash" size={18} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.generateButtonText}>GENERATE RECOMMENDATIONS</Text>
            </View>
          )}
        </TouchableOpacity>

        {recommendation && (
          <View style={styles.recommendationCard}>
            <View style={styles.recommendationHeader}>
              <View style={styles.recommendIconContainer}>
                <Ionicons name="bulb-outline" size={20} color={colors.primary} />
              </View>
              <Text style={styles.recommendationTitle}>Your Personalized Plan</Text>
            </View>
            <Text style={styles.recommendationText}>{recommendation}</Text>
            
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="share-social-outline" size={18} color={colors.primary} />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="save-outline" size={18} color={colors.primary} />
                <Text style={styles.actionText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Recommendations are generated using AI and should be used as suggestions only. 
            Always consult with a healthcare professional before making significant changes to your fitness routine.
          </Text>
        </View>
      </ScrollView>

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
    letterSpacing: typography.letterSpacing.wide,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${colors.primary}22`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.small,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    maxWidth: '80%',
  },
  optionsCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.small,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  optionTitle: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 4,
    fontWeight: '600',
  },
  optionDescription: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.default,
    marginVertical: spacing.sm,
  },
  generateButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.medium,
  },
  generateButtonDisabled: {
    backgroundColor: colors.border.default,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: spacing.xs,
  },
  generateButtonText: {
    color: colors.text.primary,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  recommendationCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.small,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  recommendIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${colors.primary}22`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginLeft: spacing.xs,
  },
  recommendationText: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.default,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: `${colors.primary}11`,
  },
  actionText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 4,
    fontWeight: '600',
  },
  footer: {
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  footerText: {
    fontSize: 12,
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 18,
  },
}); 