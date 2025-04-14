import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkoutsStart, fetchWorkoutsSuccess, fetchWorkoutsFailure } from '../store/reducers/workoutReducer';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const workouts = useSelector((state: any) => state.workout.workouts);
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      dispatch(fetchWorkoutsStart());
      const response = await axios.get('http://localhost:5000/api/workouts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchWorkoutsSuccess(response.data));
    } catch (error) {
      dispatch(fetchWorkoutsFailure('Failed to fetch workouts'));
    }
  };

  const renderWorkoutItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.workoutItem}
      onPress={() => navigation.navigate('Workout', { workoutId: item._id })}
    >
      <Text style={styles.workoutName}>{item.name}</Text>
      <Text style={styles.workoutDetails}>
        {item.type} • {item.exercises.length} exercises
      </Text>
      <Text style={styles.workoutDate}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  const chartData = {
    labels: workouts.slice(-7).map((w: any) => new Date(w.date).toLocaleDateString()),
    datasets: [
      {
        data: workouts.slice(-7).map((w: any) => w.duration),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FitTrack</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.profileButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Progress</Text>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#6200ee',
              backgroundGradientFrom: '#6200ee',
              backgroundGradientTo: '#6200ee',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Workout')}
            >
              <Text style={styles.actionButtonText}>Log Workout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Camera', { exerciseType: 'squat' })}
            >
              <Text style={styles.actionButtonText}>Form Analysis</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          <FlatList
            data={workouts.slice(0, 5)}
            renderItem={renderWorkoutItem}
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6200ee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileButton: {
    padding: 10,
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  workoutItem: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  workoutDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  workoutDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});

export default HomeScreen; 