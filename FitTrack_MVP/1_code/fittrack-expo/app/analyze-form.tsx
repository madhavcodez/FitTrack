import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, borderRadius, shadows, typography } from '../constants/theme';
import globalStyles from '../constants/globalStyles';

export default function AnalyzeFormScreen() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [tips, setTips] = useState<string[]>([]);
  
  // Request permissions and pick image
  const pickImage = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please allow access to your photo library to use this feature.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Launch image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      setAnalysis(null);
      setTips([]);
    }
  };

  // Take photo with camera
  const takePhoto = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please allow access to your camera to use this feature.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Launch camera
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      setAnalysis(null);
      setTips([]);
    }
  };

  // Analyze the image
  const analyzeImage = () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock analysis result
      setAnalysis("Your squat form shows some opportunities for improvement. Based on the image analysis, your knees are tracking inward slightly which could lead to knee strain.");
      setTips([
        "Keep your knees aligned with your toes throughout the movement",
        "Lower your hips more to achieve proper depth",
        "Engage your core more actively",
        "Keep your chest up and maintain a neutral spine",
        "Try widening your stance slightly to improve stability"
      ]);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      {/* Top Navigation Bar */}
      <View style={globalStyles.topBar}>
        <TouchableOpacity style={globalStyles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={globalStyles.headerTitle}>ANALYZE FORM</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={globalStyles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="analytics" size={32} color={colors.primary} />
          </View>
          <Text style={styles.headerTitle}>Form Analysis</Text>
          <Text style={styles.headerSubtitle}>
            Upload a photo or video of your exercise form for AI analysis and get personalized feedback
          </Text>
        </View>

        {/* Image Preview */}
        {image ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity style={styles.changeImageButton} onPress={pickImage}>
              <Ionicons name="refresh" size={18} color="#fff" />
              <Text style={styles.changeImageText}>CHANGE</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.uploadContainer}>
            <Ionicons name="cloud-upload-outline" size={48} color={colors.primary} />
            <Text style={styles.uploadText}>Upload an image to analyze</Text>
            <Text style={styles.uploadSubtext}>Choose from your gallery or take a new photo</Text>
            
            <View style={styles.uploadButtonsContainer}>
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <Ionicons name="images-outline" size={24} color="#fff" style={styles.uploadButtonIcon} />
                <Text style={styles.uploadButtonText}>GALLERY</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
                <Ionicons name="camera-outline" size={24} color="#fff" style={styles.uploadButtonIcon} />
                <Text style={styles.uploadButtonText}>CAMERA</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Analyze Button */}
        {image && !analysis && (
          <TouchableOpacity 
            style={globalStyles.primaryButton}
            onPress={analyzeImage}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View style={styles.buttonContent}>
                <Ionicons name="flash" size={18} color="#fff" style={styles.buttonIcon} />
                <Text style={globalStyles.primaryButtonText}>ANALYZE FORM</Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        {/* Analysis Results */}
        {analysis && (
          <View style={styles.resultsContainer}>
            <View style={styles.analysisCard}>
              <View style={styles.analysisHeader}>
                <View style={styles.analysisIconContainer}>
                  <Ionicons name="information-circle-outline" size={24} color={colors.primary} />
                </View>
                <Text style={styles.analysisTitle}>Analysis</Text>
              </View>
              <Text style={styles.analysisText}>{analysis}</Text>
            </View>

            <View style={styles.tipsCard}>
              <View style={styles.analysisHeader}>
                <View style={styles.analysisIconContainer}>
                  <Ionicons name="bulb-outline" size={24} color={colors.primary} />
                </View>
                <Text style={styles.analysisTitle}>Improvement Tips</Text>
              </View>
              {tips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.primary} style={styles.tipIcon} />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.newAnalysisButton}
              onPress={() => {
                setImage(null);
                setAnalysis(null);
                setTips([]);
              }}
            >
              <Ionicons name="add-circle-outline" size={18} color={colors.primary} style={styles.buttonIcon} />
              <Text style={styles.newAnalysisText}>NEW ANALYSIS</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            This analysis is provided as a guide only and should not replace professional coaching.
            If you experience any pain during exercise, please consult a healthcare professional.
          </Text>
        </View>
      </ScrollView>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginVertical: spacing.lg,
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
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    marginHorizontal: spacing.xl,
  },
  uploadContainer: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.xl,
    alignItems: 'center',
    marginVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderStyle: 'dashed',
    ...shadows.small,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: spacing.md,
  },
  uploadSubtext: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  uploadButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  uploadButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 130,
    ...shadows.small,
  },
  uploadButtonIcon: {
    marginRight: spacing.xs,
  },
  uploadButtonText: {
    color: colors.text.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  imageContainer: {
    marginVertical: spacing.md,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.medium,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  changeImageButton: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
    backgroundColor: `${colors.primary}CC`,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeImageText: {
    color: colors.text.primary,
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: spacing.xs,
  },
  resultsContainer: {
    marginTop: spacing.md,
  },
  analysisCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  tipsCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  analysisIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${colors.primary}22`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  analysisText: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  tipIcon: {
    marginRight: spacing.xs,
    marginTop: 2,
  },
  tipText: {
    fontSize: 14,
    color: colors.text.primary,
    flex: 1,
    lineHeight: 20,
  },
  newAnalysisButton: {
    backgroundColor: `${colors.primary}22`,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  newAnalysisText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  disclaimer: {
    marginVertical: spacing.lg,
    padding: spacing.md,
  },
  disclaimerText: {
    fontSize: 12,
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 18,
  },
}); 