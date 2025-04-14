import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import LogWorkoutScreen from '../screens/LogWorkoutScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OptimizeScreen from '../screens/OptimizeScreen';
import AddFoodScreen from '../screens/AddFoodScreen';
import CameraScreen from '../screens/CameraScreen';

// Define stack navigator types
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Workout: undefined;
  LogWorkout: undefined;
  Profile: undefined;
  Optimize: undefined;
  AddFood: undefined;
  Camera: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  // Use this to manage auth state (simplified for demo)
  const isSignedIn = true;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isSignedIn ? 'Home' : 'Login'}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0A0A0A' }
        }}
      >
        {isSignedIn ? (
          // Authenticated Stack
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Workout" component={WorkoutScreen} />
            <Stack.Screen name="LogWorkout" component={LogWorkoutScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Optimize" component={OptimizeScreen} />
            <Stack.Screen name="AddFood" component={AddFoodScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
          </>
        ) : (
          // Auth Stack
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
} 