import { db } from '../firebase';
import { Workout, WorkoutCreateDto, WorkoutUpdateDto } from '../models/workout';

// Collection name in Firestore
const COLLECTION_NAME = 'workouts';

/**
 * WorkoutRepository class - handles all Firestore operations for workouts
 */
export class WorkoutRepository {
  /**
   * Get all workouts for a specific user
   */
  async getUserWorkouts(userId: string): Promise<Workout[]> {
    try {
      const snapshot = await db
        .collection(COLLECTION_NAME)
        .where('userId', '==', userId)
        .orderBy('date', 'desc')
        .get();
      
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Convert Firestore Timestamps to ISO strings
          date: data.date?.toDate?.() ? data.date.toDate().toISOString() : data.date,
          createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt,
          updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : data.updatedAt
        } as Workout;
      });
    } catch (error) {
      console.error('Error getting user workouts:', error);
      throw error;
    }
  }

  /**
   * Get a specific workout by ID
   */
  async getWorkoutById(workoutId: string): Promise<Workout | null> {
    try {
      const doc = await db.collection(COLLECTION_NAME).doc(workoutId).get();
      
      if (!doc.exists) {
        return null;
      }
      
      const data = doc.data() as Omit<Workout, 'id'>;
      return {
        id: doc.id,
        ...data,
        // Convert Firestore Timestamps to ISO strings
        date: data.date?.toDate?.() ? data.date.toDate().toISOString() : data.date,
        createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : data.updatedAt
      };
    } catch (error) {
      console.error('Error getting workout by ID:', error);
      throw error;
    }
  }

  /**
   * Create a new workout
   */
  async createWorkout(workout: WorkoutCreateDto): Promise<Workout> {
    try {
      const now = new Date();
      const workoutData = {
        ...workout,
        createdAt: now,
        updatedAt: now
      };
      
      const docRef = await db.collection(COLLECTION_NAME).add(workoutData);
      return {
        id: docRef.id,
        ...workoutData,
        date: workoutData.date instanceof Date ? workoutData.date.toISOString() : workoutData.date,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString()
      };
    } catch (error) {
      console.error('Error creating workout:', error);
      throw error;
    }
  }

  /**
   * Update an existing workout
   */
  async updateWorkout(workoutId: string, workout: WorkoutUpdateDto): Promise<Workout | null> {
    try {
      const workoutRef = db.collection(COLLECTION_NAME).doc(workoutId);
      const workoutDoc = await workoutRef.get();
      
      if (!workoutDoc.exists) {
        return null;
      }
      
      const updateData = {
        ...workout,
        updatedAt: new Date()
      };
      
      await workoutRef.update(updateData);
      
      // Get the updated document
      const updatedDoc = await workoutRef.get();
      const data = updatedDoc.data() as Omit<Workout, 'id'>;
      
      return {
        id: updatedDoc.id,
        ...data,
        date: data.date?.toDate?.() ? data.date.toDate().toISOString() : data.date,
        createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() ? data.updatedAt.toDate().toISOString() : data.updatedAt
      };
    } catch (error) {
      console.error('Error updating workout:', error);
      throw error;
    }
  }

  /**
   * Delete a workout
   */
  async deleteWorkout(workoutId: string): Promise<boolean> {
    try {
      const workoutRef = db.collection(COLLECTION_NAME).doc(workoutId);
      const workoutDoc = await workoutRef.get();
      
      if (!workoutDoc.exists) {
        return false;
      }
      
      await workoutRef.delete();
      return true;
    } catch (error) {
      console.error('Error deleting workout:', error);
      throw error;
    }
  }
} 