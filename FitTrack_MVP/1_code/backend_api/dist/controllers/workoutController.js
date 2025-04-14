"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkout = exports.updateWorkout = exports.createWorkout = exports.getWorkout = exports.getWorkouts = exports.WorkoutController = void 0;
const workoutService_1 = require("../services/workoutService");
const workout_1 = __importDefault(require("../models/workout"));
const mongoose_1 = __importDefault(require("mongoose"));
class WorkoutController {
    constructor() {
        /**
         * Create a new workout
         */
        this.createWorkout = async (req, res) => {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uid;
                if (!userId) {
                    res.status(401).json({ message: 'Not authorized' });
                    return;
                }
                const workout = await this.workoutService.createWorkout({
                    ...req.body,
                    user: new mongoose_1.default.Types.ObjectId(userId)
                });
                res.status(201).json(workout);
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating workout', error });
            }
        };
        /**
         * Update an existing workout
         */
        this.updateWorkout = async (req, res) => {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uid;
                if (!userId) {
                    res.status(401).json({ message: 'Not authorized' });
                    return;
                }
                const existingWorkout = await this.workoutService.getWorkout(req.params.id);
                if (!existingWorkout) {
                    res.status(404).json({ message: 'Workout not found' });
                    return;
                }
                if (existingWorkout.user.toString() !== userId) {
                    res.status(403).json({ message: 'Not authorized to update this workout' });
                    return;
                }
                const updatedWorkout = await this.workoutService.updateWorkout(req.params.id, req.body);
                res.json(updatedWorkout);
            }
            catch (error) {
                res.status(500).json({ message: 'Error updating workout', error });
            }
        };
        /**
         * Delete a workout
         */
        this.deleteWorkout = async (req, res) => {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uid;
                if (!userId) {
                    res.status(401).json({ message: 'Not authorized' });
                    return;
                }
                const existingWorkout = await this.workoutService.getWorkout(req.params.id);
                if (!existingWorkout) {
                    res.status(404).json({ message: 'Workout not found' });
                    return;
                }
                if (existingWorkout.user.toString() !== userId) {
                    res.status(403).json({ message: 'Not authorized to delete this workout' });
                    return;
                }
                await this.workoutService.deleteWorkout(req.params.id);
                res.json({ message: 'Workout deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error deleting workout', error });
            }
        };
        this.workoutService = new workoutService_1.WorkoutService();
    }
    /**
     * Get all workouts for the authenticated user
     */
    async getUserWorkouts(req, res) {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uid;
            if (!userId) {
                res.status(401).json({ message: 'User not authenticated' });
                return;
            }
            const workouts = await this.workoutService.getUserWorkouts(userId);
            res.status(200).json(workouts);
        }
        catch (error) {
            console.error('Error fetching workouts:', error);
            res.status(500).json({ message: 'Failed to fetch workouts' });
        }
    }
    /**
     * Get a specific workout by ID
     */
    async getWorkoutById(req, res) {
        var _a;
        try {
            const { workoutId } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uid;
            if (!userId) {
                res.status(401).json({ message: 'User not authenticated' });
                return;
            }
            const workout = await this.workoutService.getWorkoutById(workoutId);
            if (!workout) {
                res.status(404).json({ message: 'Workout not found' });
                return;
            }
            // Ensure the workout belongs to the authenticated user
            if (workout.user.toString() !== userId) {
                res.status(403).json({ message: 'Access denied' });
                return;
            }
            res.status(200).json(workout);
        }
        catch (error) {
            console.error('Error fetching workout:', error);
            res.status(500).json({ message: 'Failed to fetch workout' });
        }
    }
}
exports.WorkoutController = WorkoutController;
// Get all workouts for the authenticated user
const getWorkouts = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const workouts = await workout_1.default.find({ user: userId }).sort({ date: -1 });
        res.status(200).json({
            success: true,
            count: workouts.length,
            data: workouts
        });
    }
    catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.getWorkouts = getWorkouts;
// Get a single workout by ID
const getWorkout = async (req, res) => {
    var _a;
    try {
        const workoutId = req.params.workoutId;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        // Validate workoutId is a valid MongoDB ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(workoutId)) {
            res.status(400).json({
                success: false,
                error: 'Invalid workout ID'
            });
            return;
        }
        const workout = await workout_1.default.findOne({
            _id: workoutId,
            user: userId
        });
        if (!workout) {
            res.status(404).json({
                success: false,
                error: 'Workout not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: workout
        });
    }
    catch (error) {
        console.error('Error fetching workout:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.getWorkout = getWorkout;
// Create a new workout
const createWorkout = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        // Add the user ID to the workout data
        const workoutData = {
            ...req.body,
            user: userId
        };
        const workout = await workout_1.default.create(workoutData);
        res.status(201).json({
            success: true,
            data: workout
        });
    }
    catch (error) {
        console.error('Error creating workout:', error);
        if (error instanceof Error && error.name === 'ValidationError') {
            // Handle validation errors
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};
exports.createWorkout = createWorkout;
// Update a workout
const updateWorkout = async (req, res) => {
    var _a;
    try {
        const workoutId = req.params.workoutId;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        // Validate workoutId is a valid MongoDB ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(workoutId)) {
            res.status(400).json({
                success: false,
                error: 'Invalid workout ID'
            });
            return;
        }
        // Find the workout and ensure it belongs to the user
        const workout = await workout_1.default.findOne({
            _id: workoutId,
            user: userId
        });
        if (!workout) {
            res.status(404).json({
                success: false,
                error: 'Workout not found or you do not have permission to update it'
            });
            return;
        }
        // Update the workout
        const updatedWorkout = await workout_1.default.findByIdAndUpdate(workoutId, req.body, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            data: updatedWorkout
        });
    }
    catch (error) {
        console.error('Error updating workout:', error);
        if (error instanceof Error && error.name === 'ValidationError') {
            // Handle validation errors
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};
exports.updateWorkout = updateWorkout;
// Delete a workout
const deleteWorkout = async (req, res) => {
    var _a;
    try {
        const workoutId = req.params.workoutId;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        // Validate workoutId is a valid MongoDB ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(workoutId)) {
            res.status(400).json({
                success: false,
                error: 'Invalid workout ID'
            });
            return;
        }
        // Find the workout and ensure it belongs to the user
        const workout = await workout_1.default.findOne({
            _id: workoutId,
            user: userId
        });
        if (!workout) {
            res.status(404).json({
                success: false,
                error: 'Workout not found or you do not have permission to delete it'
            });
            return;
        }
        // Delete the workout
        await workout_1.default.findByIdAndDelete(workoutId);
        res.status(200).json({
            success: true,
            data: {}
        });
    }
    catch (error) {
        console.error('Error deleting workout:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
exports.deleteWorkout = deleteWorkout;
