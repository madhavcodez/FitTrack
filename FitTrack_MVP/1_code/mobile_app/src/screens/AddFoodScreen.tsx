import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  FlatList,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, spacing, borderRadius } from '../constants/theme';

type FoodItem = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
  image: string;
}

const foodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Chicken Breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    serving: '100g',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3'
  },
  {
    id: '2',
    name: 'Brown Rice',
    calories: 112,
    protein: 2.6,
    carbs: 22.9,
    fat: 0.9,
    serving: '100g',
    image: 'https://images.unsplash.com/photo-1536304447766-da0ed4ce1b73?ixlib=rb-4.0.3'
  },
  {
    id: '3',
    name: 'Salmon',
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 13,
    serving: '100g',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3'
  },
  {
    id: '4',
    name: 'Broccoli',
    calories: 34,
    protein: 2.8,
    carbs: 6.6,
    fat: 0.4,
    serving: '100g',
    image: 'https://images.unsplash.com/photo-1583480114521-8d71e2e6b8c6?ixlib=rb-4.0.3'
  },
  {
    id: '5',
    name: 'Sweet Potato',
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fat: 0.1,
    serving: '100g',
    image: 'https://images.unsplash.com/photo-1596097635171-a101d12b0912?ixlib=rb-4.0.3'
  }
];

export default function AddFoodScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
  const [servingSizes, setServingSizes] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<FoodItem[]>(foodItems);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      if (query.length > 0) {
        const filtered = foodItems.filter(
          item => item.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered);
      } else {
        setSearchResults(foodItems);
      }
      setIsSearching(false);
    }, 500);
  };

  const selectFood = (food) => {
    if (!selectedFoods.find(item => item.id === food.id)) {
      setSelectedFoods([...selectedFoods, food]);
      setServingSizes({ ...servingSizes, [food.id]: 1 });
    }
  };

  const removeFood = (foodId) => {
    setSelectedFoods(selectedFoods.filter(item => item.id !== foodId));
    const newServingSizes = { ...servingSizes };
    delete newServingSizes[foodId];
    setServingSizes(newServingSizes);
  };

  const updateServingSize = (foodId, size) => {
    setServingSizes({ ...servingSizes, [foodId]: parseFloat(size) || 0 });
  };

  const getTotalCalories = () => {
    return selectedFoods.reduce((total, food) => {
      return total + (food.calories * (servingSizes[food.id] || 0));
    }, 0).toFixed(0);
  };

  const getTotalNutrient = (nutrient) => {
    return selectedFoods.reduce((total, food) => {
      return total + (food[nutrient] * (servingSizes[food.id] || 0));
    }, 0).toFixed(1);
  };

  const saveMeal = () => {
    // Logic to save meal to database would go here
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>ADD FOOD</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={colors.text.secondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for foods..."
              placeholderTextColor={colors.text.secondary}
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color={colors.text.secondary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Search Results */}
          {isSearching ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={colors.primary} />
              <Text style={styles.loadingText}>Searching...</Text>
            </View>
          ) : searchResults.length > 0 ? (
            <View style={styles.resultsContainer}>
              <Text style={styles.sectionTitle}>Results</Text>
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.foodItem}
                    onPress={() => selectFood(item)}
                  >
                    <Image 
                      source={{ uri: item.image }} 
                      style={styles.foodImage} 
                    />
                    <View style={styles.foodInfo}>
                      <Text style={styles.foodName}>{item.name}</Text>
                      <Text style={styles.foodCalories}>{item.calories} cal per {item.serving}</Text>
                      <View style={styles.macrosContainer}>
                        <Text style={styles.macroText}>P: {item.protein}g</Text>
                        <Text style={styles.macroText}>C: {item.carbs}g</Text>
                        <Text style={styles.macroText}>F: {item.fat}g</Text>
                      </View>
                    </View>
                    <TouchableOpacity 
                      style={styles.addButton}
                      onPress={() => selectFood(item)}
                    >
                      <Ionicons name="add" size={24} color="#fff" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : searchQuery.length > 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={40} color={colors.text.secondary} />
              <Text style={styles.emptyText}>No foods found for "{searchQuery}"</Text>
              <Text style={styles.emptySubText}>Try a different search term or add a custom food</Text>
            </View>
          ) : null}

          {/* Selected Foods */}
          {selectedFoods.length > 0 && (
            <View style={styles.selectedContainer}>
              <Text style={styles.sectionTitle}>Your Meal</Text>
              {selectedFoods.map(food => (
                <View key={food.id} style={styles.selectedFoodItem}>
                  <Image 
                    source={{ uri: food.image }} 
                    style={styles.selectedFoodImage} 
                  />
                  <View style={styles.selectedFoodInfo}>
                    <Text style={styles.selectedFoodName}>{food.name}</Text>
                    <View style={styles.selectedMacrosContainer}>
                      <Text style={styles.selectedMacroText}>
                        {(food.calories * (servingSizes[food.id] || 0)).toFixed(0)} cal
                      </Text>
                      <Text style={styles.selectedMacroText}>
                        P: {(food.protein * (servingSizes[food.id] || 0)).toFixed(1)}g
                      </Text>
                      <Text style={styles.selectedMacroText}>
                        C: {(food.carbs * (servingSizes[food.id] || 0)).toFixed(1)}g
                      </Text>
                      <Text style={styles.selectedMacroText}>
                        F: {(food.fat * (servingSizes[food.id] || 0)).toFixed(1)}g
                      </Text>
                    </View>
                  </View>
                  <View style={styles.servingContainer}>
                    <TextInput
                      style={styles.servingInput}
                      keyboardType="numeric"
                      value={servingSizes[food.id]?.toString() || '0'}
                      onChangeText={(text) => updateServingSize(food.id, text)}
                    />
                    <Text style={styles.servingText}>x {food.serving}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => removeFood(food.id)}
                  >
                    <Ionicons name="close" size={20} color={colors.text.secondary} />
                  </TouchableOpacity>
                </View>
              ))}

              {/* Nutrition Summary */}
              <View style={styles.nutritionSummary}>
                <Text style={styles.summaryTitle}>Nutrition Summary</Text>
                <View style={styles.macroSummaryContainer}>
                  <View style={styles.macroSummaryItem}>
                    <Text style={styles.macroSummaryValue}>{getTotalCalories()}</Text>
                    <Text style={styles.macroSummaryLabel}>Calories</Text>
                  </View>
                  <View style={styles.macroSummaryItem}>
                    <Text style={styles.macroSummaryValue}>{getTotalNutrient('protein')}g</Text>
                    <Text style={styles.macroSummaryLabel}>Protein</Text>
                  </View>
                  <View style={styles.macroSummaryItem}>
                    <Text style={styles.macroSummaryValue}>{getTotalNutrient('carbs')}g</Text>
                    <Text style={styles.macroSummaryLabel}>Carbs</Text>
                  </View>
                  <View style={styles.macroSummaryItem}>
                    <Text style={styles.macroSummaryValue}>{getTotalNutrient('fat')}g</Text>
                    <Text style={styles.macroSummaryLabel}>Fat</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveMeal}
              >
                <Text style={styles.saveButtonText}>SAVE MEAL</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: colors.background.darker,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.input,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: colors.text.primary,
    fontSize: 16,
  },
  clearButton: {
    padding: spacing.xs,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  loadingText: {
    marginTop: spacing.sm,
    color: colors.text.secondary,
  },
  resultsContainer: {
    marginBottom: spacing.lg,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    marginTop: spacing.md,
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptySubText: {
    marginTop: spacing.xs,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  foodItem: {
    flexDirection: 'row',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  foodImage: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.sm,
    marginRight: spacing.md,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 2,
  },
  foodCalories: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  macrosContainer: {
    flexDirection: 'row',
  },
  macroText: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginRight: spacing.sm,
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedContainer: {
    marginTop: spacing.lg,
  },
  selectedFoodItem: {
    flexDirection: 'row',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  selectedFoodImage: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    marginRight: spacing.md,
  },
  selectedFoodInfo: {
    flex: 1,
  },
  selectedFoodName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 2,
  },
  selectedMacrosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedMacroText: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginRight: spacing.sm,
  },
  servingContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  servingInput: {
    width: 50,
    height: 36,
    backgroundColor: colors.background.input,
    borderRadius: borderRadius.sm,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 2,
  },
  servingText: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
  removeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nutritionSummary: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  macroSummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroSummaryItem: {
    alignItems: 'center',
  },
  macroSummaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  macroSummaryLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  saveButtonText: {
    color: colors.text.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 