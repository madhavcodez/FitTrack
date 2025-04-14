import { IWorkout, Workout, WorkoutCreateDto, WorkoutUpdateDto } from '../models/workout';
import mongoose from 'mongoose';

/**
 * Service class for handling workout-related business logic
 */
export class WorkoutService {
  /**
   * Get all workouts for a specific user
   * @param userId The ID of the user
   */
  async getUserWorkouts(userId: string): Promise<IWorkout[]> {
    return await Workout.find({ userId }).sort({ date: -1 }).exec();
  }

  /**
   * Get a workout by its ID
   * @param workoutId The ID of the workout
   */
  async getWorkoutById(workoutId: string): Promise<IWorkout | null> {
    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
      throw new Error('Invalid workout ID');
    }
    
    return await Workout.findById(workoutId).exec();
  }

  /**
   * Create a new workout
   * @param workoutData Data for the new workout
   */
  async createWorkout(workoutData: WorkoutCreateDto): Promise<IWorkout> {
    const workout = new Workout(workoutData);
    return await workout.save();
  }

  /**
   * Update an existing workout
   * @param workoutId The ID of the workout to update
   * @param workoutData The updated workout data
   */
  async updateWorkout(
    workoutId: string, 
    workoutData: WorkoutUpdateDto
  ): Promise<IWorkout | null> {
    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
      throw new Error('Invalid workout ID');
    }
    
    return await Workout.findByIdAndUpdate(
      workoutId,
      { $set: workoutData },
      { new: true }
    ).exec();
  }

  /**
   * Delete a workout
   * @param workoutId The ID of the workout to delete
   */
  async deleteWorkout(workoutId: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
      throw new Error('Invalid workout ID');
    }
    
    const result = await Workout.findByIdAndDelete(workoutId).exec();
    return result !== null;
  }
} 