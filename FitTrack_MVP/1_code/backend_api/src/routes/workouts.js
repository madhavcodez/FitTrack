const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Workout = require('../models/Workout');

// Get all workouts for a user
router.get('/', auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id })
      .sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single workout
router.get('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    
    res.json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new workout
router.post('/', [
  auth,
  body('name').trim().notEmpty(),
  body('type').isIn(['strength', 'cardio', 'flexibility', 'hiit']),
  body('exercises').isArray(),
  body('duration').isInt({ min: 0 }),
  body('difficulty').isIn(['beginner', 'intermediate', 'advanced'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const workout = new Workout({
      ...req.body,
      userId: req.user.id
    });

    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a workout
router.put('/:id', [
  auth,
  body('name').optional().trim().notEmpty(),
  body('type').optional().isIn(['strength', 'cardio', 'flexibility', 'hiit']),
  body('exercises').optional().isArray(),
  body('duration').optional().isInt({ min: 0 }),
  body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: req.body },
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a workout
router.delete('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.json({ message: 'Workout deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add form feedback to an exercise
router.post('/:workoutId/exercises/:exerciseIndex/feedback', [
  auth,
  body('feedback').trim().notEmpty(),
  body('score').isFloat({ min: 0, max: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const workout = await Workout.findOne({
      _id: req.params.workoutId,
      userId: req.user.id
    });

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    const exerciseIndex = parseInt(req.params.exerciseIndex);
    if (exerciseIndex >= workout.exercises.length) {
      return res.status(400).json({ message: 'Invalid exercise index' });
    }

    workout.exercises[exerciseIndex].formFeedback.push({
      timestamp: new Date(),
      feedback: req.body.feedback,
      score: req.body.score
    });

    await workout.save();
    res.json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 