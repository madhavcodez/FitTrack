"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workoutController_1 = require("../controllers/workoutController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const workoutController = new workoutController_1.WorkoutController();
// Apply auth middleware to all workout routes
router.use(auth_1.authMiddleware);
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
exports.default = router;
