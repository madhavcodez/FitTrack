import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { 
  getWorkouts, 
  getWorkout, 
  createWorkout, 
  updateWorkout, 
  deleteWorkout 
} from '../controllers/workoutController';

const router = express.Router();

// Protect all workout routes
router.use(protect);

// Routes for /api/workouts
router.route('/')
  .get(getWorkouts)
  .post(createWorkout);

// Routes for /api/workouts/:workoutId
router.route('/:workoutId')
  .get(getWorkout)
  .put(updateWorkout)
  .delete(deleteWorkout);

export default router; 