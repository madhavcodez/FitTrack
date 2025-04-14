import { Router } from 'express';
import { WorkoutController } from '../controllers/workoutController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const workoutController = new WorkoutController();

// Apply auth middleware to all workout routes
router.use(authMiddleware);

// Get all workouts for the authenticated user
router.get('/', (req, res) => workoutController.getUserWorkouts(req, res));

// Get a specific workout by ID
router.get('/:id', (req, res) => workoutController.getWorkoutById(req, res));

// Create a new workout
router.post('/', (req, res) => workoutController.createWorkout(req, res));

// Update a workout
router.put('/:id', (req, res) => workoutController.updateWorkout(req, res));

// Delete a workout
router.delete('/:id', (req, res) => workoutController.deleteWorkout(req, res));

export default router; 