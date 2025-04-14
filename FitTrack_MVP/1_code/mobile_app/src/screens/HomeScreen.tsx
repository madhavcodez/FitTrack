import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetWorkoutsQuery } from '../store/api';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Logo from '../components/Logo';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { data: workouts, isLoading, error } = useGetWorkoutsQuery();

  const renderWorkoutItem = ({ item }) => (
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
    labels: workouts ? workouts.slice(-7).map((w) => new Date(w.date).toLocaleDateString()) : [],
    datasets: [
      {
        data: workouts ? workouts.slice(-7).map((w) => w.duration) : [0],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo size="medium" />
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.profileButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load workouts</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => useGetWorkoutsQuery()}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Weekly Progress</Text>
              {workouts && workouts.length > 0 ? (
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
              ) : (
                <Text style={styles.noDataText}>No workout data available</Text>
              )}
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
              {workouts && workouts.length > 0 ? (
                <FlatList
                  data={workouts.slice(0, 5)}
                  renderItem={renderWorkoutItem}
                  keyExtractor={(item) => item._id}
                  scrollEnabled={false}
                />
              ) : (
                <Text style={styles.noDataText}>No workouts logged yet</Text>
              )}
            </View>
          </>
        )}
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6200ee',
  },
  profileButton: {
    position: 'absolute',
    right: 20,
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
  loader: {
    marginTop: 50,
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  errorText: {
    color: '#ff4444',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
  },
  noDataText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 10,
  },
});

export default HomeScreen; 