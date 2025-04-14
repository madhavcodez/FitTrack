import { Request, Response } from 'express';
import { WorkoutService } from '../services/workoutService';
import { AuthRequest } from '../middleware/authMiddleware';
import Workout, { IWorkout } from '../models/workout';
import mongoose from 'mongoose';

export class WorkoutController {
  private workoutService: WorkoutService;

  constructor() {
    this.workoutService = new WorkoutService();
  }

  /**
   * Get all workouts for the authenticated user
   */
  async getUserWorkouts(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.uid;
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }

      const workouts = await this.workoutService.getUserWorkouts(userId);
      res.status(200).json(workouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      res.status(500).json({ message: 'Failed to fetch workouts' });
    }
  }

  /**
   * Get a specific workout by ID
   */
  async getWorkoutById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { workoutId } = req.params;
      const userId = req.user?.uid;

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
    } catch (error) {
      console.error('Error fetching workout:', error);
      res.status(500).json({ message: 'Failed to fetch workout' });
    }
  }

  /**
   * Create a new workout
   */
  createWorkout = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.uid;
      if (!userId) {
        res.status(401).json({ message: 'Not authorized' });
        return;
      }

      const workout = await this.workoutService.createWorkout({
        ...req.body,
        user: new mongoose.Types.ObjectId(userId)
      });

      res.status(201).json(workout);
    } catch (error) {
      res.status(500).json({ message: 'Error creating workout', error });
    }
  };

  /**
   * Update an existing workout
   */
  updateWorkout = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.uid;
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
    } catch (error) {
      res.status(500).json({ message: 'Error updating workout', error });
    }
  };

  /**
   * Delete a workout
   */
  deleteWorkout = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.uid;
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
    } catch (error) {
      res.status(500).json({ message: 'Error deleting workout', error });
    }
  };
}

// Get all workouts for the authenticated user
export const getWorkouts = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    
    const workouts = await Workout.find({ user: userId }).sort({ date: -1 });
    
    res.status(200).json({
      success: true,
      count: workouts.length,
      data: workouts
    });
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get a single workout by ID
export const getWorkout = async (req: Request, res: Response): Promise<void> => {
  try {
    const workoutId = req.params.workoutId;
    const userId = req.user?.id;

    // Validate workoutId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
      res.status(400).json({
        success: false,
        error: 'Invalid workout ID'
      });
      return;
    }

    const workout = await Workout.findOne({ 
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
  } catch (error) {
    console.error('Error fetching workout:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Create a new workout
export const createWorkout = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    
    // Add the user ID to the workout data
    const workoutData = {
      ...req.body,
      user: userId
    };

    const workout = await Workout.create(workoutData);

    res.status(201).json({
      success: true,
      data: workout
    });
  } catch (error) {
    console.error('Error creating workout:', error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      // Handle validation errors
      res.status(400).json({
        success: false,
        error: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// Update a workout
export const updateWorkout = async (req: Request, res: Response): Promise<void> => {
  try {
    const workoutId = req.params.workoutId;
    const userId = req.user?.id;

    // Validate workoutId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
      res.status(400).json({
        success: false,
        error: 'Invalid workout ID'
      });
      return;
    }

    // Find the workout and ensure it belongs to the user
    const workout = await Workout.findOne({
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
    const updatedWorkout = await Workout.findByIdAndUpdate(
      workoutId,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedWorkout
    });
  } catch (error) {
    console.error('Error updating workout:', error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      // Handle validation errors
      res.status(400).json({
        success: false,
        error: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// Delete a workout
export const deleteWorkout = async (req: Request, res: Response): Promise<void> => {
  try {
    const workoutId = req.params.workoutId;
    const userId = req.user?.id;

    // Validate workoutId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
      res.status(400).json({
        success: false,
        error: 'Invalid workout ID'
      });
      return;
    }

    // Find the workout and ensure it belongs to the user
    const workout = await Workout.findOne({
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
    await Workout.findByIdAndDelete(workoutId);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}; 