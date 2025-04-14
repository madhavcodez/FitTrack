// Theme constants for FitTrack app

export const colors = {
  // Primary colors
  primary: '#7C4DFF',  // Deep purple accent
  primaryLight: '#9E7CFF', // Lighter purple for hover states
  primaryDark: '#5B31D6', // Darker purple for pressed states
  secondary: '#00E5FF', // Bright cyan accent
  
  // Background colors
  background: {
    dark: '#0A0A0A',    // Darker black
    darker: '#101010',  // Almost black
    card: '#141414',    // Dark card background
    input: '#1A1A1A',   // Input field background
    overlay: 'rgba(0, 0, 0, 0.7)', // For modal overlays
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#AAAAAA',
    tertiary: '#777777',
    accent: '#7C4DFF',
    highlight: '#00E5FF',
  },
  
  // Border colors
  border: {
    default: '#222222',
    accent: '#7C4DFF',
    mealTag: '#1A237E',
    focus: '#9E7CFF',
  },
  
  // Status colors
  status: {
    success: '#00C853', // Bright green
    warning: '#FFAB00', // Amber
    error: '#FF3D00',   // Deep orange
    info: '#2196F3',    // Blue
  },
  
  // Gradients
  gradients: {
    primary: ['#5B31D6', '#7C4DFF', '#9E7CFF'],
    dark: ['#101010', '#0A0A0A'],
  }
};

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
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
    display: 40,
  },
  weight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    black: '900',
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
    widest: 2,
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
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
};

// Common animation presets
export const animations = {
  timing: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    // Add custom easing functions if needed
  },
};

// Common component styling to maintain consistency
export const components = {
  card: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.small,
  },
  button: {
    primary: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.md,
    },
    secondary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.primary,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.md,
    },
  },
  input: {
    backgroundColor: colors.background.input,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    color: colors.text.primary,
  },
};

export default {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
  animations,
  components,
}; 