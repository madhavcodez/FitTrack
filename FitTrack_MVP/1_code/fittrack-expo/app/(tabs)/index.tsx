import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function MainScreen() {
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
    },
    {
      _id: '3',
      name: 'Yoga Flow',
      type: 'flexibility',
      exercises: ['Downward Dog', 'Warrior Pose', 'Child Pose'],
      duration: 60,
      date: new Date().toISOString(),
      calories: 280,
      difficulty: 'medium'
    }
  ]);
  const [loading, setLoading] = useState(false);

  // Check server status on app load
  useEffect(() => {
    checkApiStatus();
    checkAiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5001/health');
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
      const response = await fetch('http://10.0.2.2:5002/health');
      if (response.ok) {
        setAiStatus('Online ✅');
      } else {
        setAiStatus('Error ❌');
      }
    } catch (error) {
      setAiStatus('Offline ❌');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>FITTRACK</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Main Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>1,050</Text>
          <View style={styles.statRing}>
            <View style={[styles.statRingFill, { width: '75%' }]} />
          </View>
          <Text style={styles.statLabel}>CALORIES</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>135</Text>
          <View style={styles.statRing}>
            <View style={[styles.statRingFill, { width: '60%' }]} />
          </View>
          <Text style={styles.statLabel}>MINUTES</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>3</Text>
          <View style={styles.statRing}>
            <View style={[styles.statRingFill, { width: '30%' }]} />
          </View>
          <Text style={styles.statLabel}>WORKOUTS</Text>
        </View>
      </View>
      
      {/* Today's Plan Section */}
      <View style={styles.planSection}>
        <Text style={styles.sectionTitle}>TODAY'S PLAN</Text>
      </View>
      
      {/* Workouts List */}
      <ScrollView style={styles.workoutsList} showsVerticalScrollIndicator={false}>
        {workouts.map((workout, index) => (
          <TouchableOpacity 
            key={workout._id} 
            style={[
              styles.workoutCard,
              index === 0 && styles.activeWorkout
            ]}
            activeOpacity={0.8}
          >
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <View style={styles.tagContainer}>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{workout.type}</Text>
                  </View>
                  <Text style={styles.durationText}>{workout.duration} min</Text>
                </View>
              </View>
              <View style={styles.calorieContainer}>
                <Text style={styles.calorieValue}>{workout.calories}</Text>
                <Text style={styles.calorieLabel}>cal</Text>
              </View>
            </View>
            
            {/* Card Content */}
            <View style={styles.exercisesList}>
              {workout.exercises.map((exercise, idx) => (
                <View key={idx} style={styles.exerciseItem}>
                  <Ionicons name="fitness-outline" size={16} color="#888" />
                  <Text style={styles.exerciseName}>{exercise}</Text>
                </View>
              ))}
            </View>
            
            {/* Card Actions */}
            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="play-outline" size={18} color="#00C3A3" />
                <Text style={[styles.actionText, { color: "#00C3A3" }]}>START</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="pencil-outline" size={18} color="#888" />
                <Text style={styles.actionText}>EDIT</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
      
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
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#1D1D1D',
  },
  statItem: {
    alignItems: 'center',
    width: (width - 80) / 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  statRing: {
    width: '100%',
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  statRingFill: {
    height: '100%',
    backgroundColor: '#00C3A3',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    letterSpacing: 0.5,
  },
  planSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  workoutsList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  workoutCard: {
    backgroundColor: '#1D1D1D',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  activeWorkout: {
    borderLeftWidth: 4,
    borderLeftColor: '#00C3A3',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#2D2D2D',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#00C3A3',
    textTransform: 'uppercase',
  },
  durationText: {
    fontSize: 12,
    color: '#888',
  },
  calorieContainer: {
    alignItems: 'center',
  },
  calorieValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00C3A3',
  },
  calorieLabel: {
    fontSize: 12,
    color: '#888',
  },
  exercisesList: {
    marginBottom: 12,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 14,
    color: '#ccc',
    marginLeft: 8,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#2D2D2D',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#888',
    marginLeft: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00C3A3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  statusBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1A1A1A',
  },
  statusText: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
});
