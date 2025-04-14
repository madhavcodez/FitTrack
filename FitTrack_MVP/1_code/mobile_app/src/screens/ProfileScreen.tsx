import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/reducers/authReducer';
import axios from 'axios';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age?.toString() || '',
    height: user?.height?.toString() || '',
    weight: user?.weight?.toString() || '',
    fitnessLevel: user?.fitnessLevel || 'beginner',
    goals: user?.goals || [],
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        'http://localhost:5000/api/users/profile',
        {
          ...formData,
          age: parseInt(formData.age),
          height: parseInt(formData.height),
          weight: parseInt(formData.weight),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('Success', 'Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            editable={isEditing}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={formData.age}
            onChangeText={(text) => setFormData({ ...formData, age: text })}
            keyboardType="numeric"
            editable={isEditing}
          />
          <TextInput
            style={styles.input}
            placeholder="Height (cm)"
            value={formData.height}
            onChangeText={(text) => setFormData({ ...formData, height: text })}
            keyboardType="numeric"
            editable={isEditing}
          />
          <TextInput
            style={styles.input}
            placeholder="Weight (kg)"
            value={formData.weight}
            onChangeText={(text) => setFormData({ ...formData, weight: text })}
            keyboardType="numeric"
            editable={isEditing}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fitness Level</Text>
          <View style={styles.radioGroup}>
            {['beginner', 'intermediate', 'advanced'].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.radioButton,
                  formData.fitnessLevel === level && styles.radioButtonSelected,
                ]}
                onPress={() => setFormData({ ...formData, fitnessLevel: level })}
                disabled={!isEditing}
              >
                <Text
                  style={[
                    styles.radioButtonText,
                    formData.fitnessLevel === level && styles.radioButtonTextSelected,
                  ]}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fitness Goals</Text>
          {['weight_loss', 'muscle_gain', 'endurance', 'flexibility'].map((goal) => (
            <TouchableOpacity
              key={goal}
              style={[
                styles.goalButton,
                formData.goals.includes(goal) && styles.goalButtonSelected,
              ]}
              onPress={() => {
                const newGoals = formData.goals.includes(goal)
                  ? formData.goals.filter((g) => g !== goal)
                  : [...formData.goals, goal];
                setFormData({ ...formData, goals: newGoals });
              }}
              disabled={!isEditing}
            >
              <Text
                style={[
                  styles.goalButtonText,
                  formData.goals.includes(goal) && styles.goalButtonTextSelected,
                ]}
              >
                {goal.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#6200ee',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#6200ee',
    width: '30%',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#6200ee',
  },
  radioButtonText: {
    color: '#6200ee',
  },
  radioButtonTextSelected: {
    color: '#fff',
  },
  goalButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6200ee',
    marginBottom: 10,
    alignItems: 'center',
  },
  goalButtonSelected: {
    backgroundColor: '#6200ee',
  },
  goalButtonText: {
    color: '#6200ee',
    fontSize: 16,
  },
  goalButtonTextSelected: {
    color: '#fff',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6200ee',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#6200ee',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  logoutButtonText: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 