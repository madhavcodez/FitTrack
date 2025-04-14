// Theme constants for FitTrack app

export const colors = {
  // Primary colors
  primary: '#7C4DFF',  // Deep purple accent
  secondary: '#00E5FF', // Bright cyan accent
  
  // Background colors
  background: {
    dark: '#0A0A0A',    // Darker black
    darker: '#101010',  // Almost black
    card: '#141414',    // Dark card background
    input: '#1A1A1A',   // Input field background
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#AAAAAA',
    tertiary: '#777777',
    accent: '#7C4DFF',
  },
  
  // Border colors
  border: {
    default: '#222222',
    accent: '#7C4DFF',
    mealTag: '#1A237E',
  },
  
  // Status colors
  status: {
    success: '#00C853', // Bright green
    warning: '#FFAB00', // Amber
    error: '#FF3D00',   // Deep orange
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  circle: 9999,
};

export const typography = {
  size: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
    xxxl: 28,
  },
  weight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
};

export default {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
}; 