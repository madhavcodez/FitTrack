"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutService = void 0;
const workout_1 = require("../models/workout");
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Service class for handling workout-related business logic
 */
class WorkoutService {
    /**
     * Get all workouts for a specific user
     * @param userId The ID of the user
     */
    async getUserWorkouts(userId) {
        return await workout_1.Workout.find({ userId }).sort({ date: -1 }).exec();
    }
    /**
     * Get a workout by its ID
     * @param workoutId The ID of the workout
     */
    async getWorkoutById(workoutId) {
        if (!mongoose_1.default.Types.ObjectId.isValid(workoutId)) {
            throw new Error('Invalid workout ID');
        }
        return await workout_1.Workout.findById(workoutId).exec();
    }
    /**
     * Create a new workout
     * @param workoutData Data for the new workout
     */
    async createWorkout(workoutData) {
        const workout = new workout_1.Workout(workoutData);
        return await workout.save();
    }
    /**
     * Update an existing workout
     * @param workoutId The ID of the workout to update
     * @param workoutData The updated workout data
     */
    async updateWorkout(workoutId, workoutData) {
        if (!mongoose_1.default.Types.ObjectId.isValid(workoutId)) {
            throw new Error('Invalid workout ID');
        }
        return await workout_1.Workout.findByIdAndUpdate(workoutId, { $set: workoutData }, { new: true }).exec();
    }
    /**
     * Delete a workout
     * @param workoutId The ID of the workout to delete
     */
    async deleteWorkout(workoutId) {
        if (!mongoose_1.default.Types.ObjectId.isValid(workoutId)) {
            throw new Error('Invalid workout ID');
        }
        const result = await workout_1.Workout.findByIdAndDelete(workoutId).exec();
        return result !== null;
    }
}
exports.WorkoutService = WorkoutService;
