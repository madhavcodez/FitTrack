import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function RootNavigation() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="add-workout" />
      <Stack.Screen name="analyze-form" />
    </Stack>
  );
} 