import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { colors } from '../constants/theme';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

// Create a custom dark theme based on our color scheme
const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.background.dark,
    card: colors.background.card,
    text: colors.text.primary,
    border: colors.border.default,
    notification: colors.status.error,
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background.dark,
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="add-workout" />
      <Stack.Screen name="log-workout" />
      <Stack.Screen name="add-food" />
      <Stack.Screen name="analyze-form" />
      <Stack.Screen name="optimize" />
    </Stack>
  );
}
