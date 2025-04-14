import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showTagline?: boolean;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  showTagline = true,
  color = '#ffffff'
}) => {
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return { title: 24, tagline: 12 };
      case 'large':
        return { title: 36, tagline: 16 };
      default:
        return { title: 28, tagline: 14 };
    }
  };

  const fontSize = getFontSize();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: fontSize.title, color }]}>
        FitTrack
      </Text>
      {showTagline && (
        <Text style={[styles.tagline, { fontSize: fontSize.tagline, color }]}>
          trAIn smart, achieve more
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  tagline: {
    fontStyle: 'italic',
    marginTop: 4,
    opacity: 0.8,
  },
});

export default Logo; 