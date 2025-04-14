const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  sets: {
    type: Number,
    required: true,
    min: 1
  },
  reps: {
    type: Number,
    required: true,
    min: 1
  },
  weight: {
    type: Number,
    min: 0
  },
  duration: {
    type: Number,
    min: 0
  },
  formFeedback: [{
    timestamp: Date,
    feedback: String,
    score: Number
  }]
});

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['strength', 'cardio', 'flexibility', 'hiit'],
    required: true
  },
  exercises: [exerciseSchema],
  duration: {
    type: Number,
    required: true,
    min: 0
  },
  caloriesBurned: {
    type: Number,
    min: 0
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: String,
  aiFeedback: {
    overallScore: Number,
    suggestions: [String],
    improvements: [String]
  }
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout; 