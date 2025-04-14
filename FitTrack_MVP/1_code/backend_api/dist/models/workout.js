"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Exercise schema
const ExerciseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Exercise name is required']
    },
    sets: {
        type: Number,
        required: [true, 'Number of sets is required'],
        min: [1, 'Must have at least 1 set']
    },
    reps: {
        type: Number,
        required: [true, 'Number of reps is required'],
        min: [1, 'Must have at least 1 rep']
    },
    weight: {
        type: Number,
        min: [0, 'Weight cannot be negative']
    },
    duration: {
        type: Number,
        min: [0, 'Duration cannot be negative']
    },
    calories: { type: Number },
    notes: String,
    formFeedback: [String],
    formScore: { type: Number }
});
// Workout schema
const WorkoutSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Workout name is required'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Workout type is required'],
        enum: ['strength', 'cardio', 'flexibility', 'hiit', 'other']
    },
    date: { type: Date, default: Date.now, index: true },
    duration: {
        type: Number,
        min: [0, 'Duration cannot be negative']
    },
    totalCalories: { type: Number },
    exercises: {
        type: [ExerciseSchema],
        required: [true, 'Exercises are required'],
        validate: {
            validator: function (exercises) {
                return exercises.length > 0;
            },
            message: 'Workout must have at least one exercise'
        }
    },
    notes: { type: String },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
// Create and export the model
exports.default = mongoose_1.default.model('Workout', WorkoutSchema);
