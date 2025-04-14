import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Workout } from '../api';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  formFeedback?: Array<{
    timestamp: Date;
    feedback: string;
    score: number;
  }>;
}

interface WorkoutState {
  workouts: Workout[];
  currentWorkout: Workout | null;
  loading: boolean;
  error: string | null;
}

const initialState: WorkoutState = {
  workouts: [],
  currentWorkout: null,
  loading: false,
  error: null,
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    fetchWorkoutsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWorkoutsSuccess: (state, action: PayloadAction<Workout[]>) => {
      state.workouts = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchWorkoutsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchWorkoutStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWorkoutSuccess: (state, action: PayloadAction<Workout>) => {
      state.currentWorkout = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchWorkoutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addWorkout: (state, action: PayloadAction<Workout>) => {
      state.workouts.push(action.payload);
    },
    updateWorkout: (state, action: PayloadAction<Workout>) => {
      const index = state.workouts.findIndex(
        (workout) => workout._id === action.payload._id
      );
      if (index !== -1) {
        state.workouts[index] = action.payload;
      }
      if (state.currentWorkout && state.currentWorkout._id === action.payload._id) {
        state.currentWorkout = action.payload;
      }
    },
    deleteWorkout: (state, action: PayloadAction<string>) => {
      state.workouts = state.workouts.filter(
        (workout) => workout._id !== action.payload
      );
      if (state.currentWorkout && state.currentWorkout._id === action.payload) {
        state.currentWorkout = null;
      }
    },
  },
});

export const {
  fetchWorkoutsStart,
  fetchWorkoutsSuccess,
  fetchWorkoutsFailure,
  fetchWorkoutStart,
  fetchWorkoutSuccess,
  fetchWorkoutFailure,
  addWorkout,
  updateWorkout,
  deleteWorkout,
} = workoutSlice.actions;

export const workoutReducer = workoutSlice.reducer; 