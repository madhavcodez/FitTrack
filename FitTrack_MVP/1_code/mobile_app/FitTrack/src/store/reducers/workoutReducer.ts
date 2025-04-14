import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface Workout {
  id: string;
  name: string;
  type: 'strength' | 'cardio' | 'flexibility' | 'hiit';
  exercises: Exercise[];
  duration: number;
  caloriesBurned?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  date: Date;
  notes?: string;
  aiFeedback?: {
    overallScore: number;
    suggestions: string[];
    improvements: string[];
  };
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
      state.loading = false;
      state.workouts = action.payload;
      state.error = null;
    },
    fetchWorkoutsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentWorkout: (state, action: PayloadAction<Workout>) => {
      state.currentWorkout = action.payload;
    },
    addWorkout: (state, action: PayloadAction<Workout>) => {
      state.workouts.push(action.payload);
    },
    updateWorkout: (state, action: PayloadAction<Workout>) => {
      const index = state.workouts.findIndex(w => w.id === action.payload.id);
      if (index !== -1) {
        state.workouts[index] = action.payload;
      }
    },
    deleteWorkout: (state, action: PayloadAction<string>) => {
      state.workouts = state.workouts.filter(w => w.id !== action.payload);
    },
    addFormFeedback: (state, action: PayloadAction<{
      workoutId: string;
      exerciseIndex: number;
      feedback: {
        timestamp: Date;
        feedback: string;
        score: number;
      };
    }>) => {
      const { workoutId, exerciseIndex, feedback } = action.payload;
      const workout = state.workouts.find(w => w.id === workoutId);
      if (workout && workout.exercises[exerciseIndex]) {
        if (!workout.exercises[exerciseIndex].formFeedback) {
          workout.exercises[exerciseIndex].formFeedback = [];
        }
        workout.exercises[exerciseIndex].formFeedback?.push(feedback);
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchWorkoutsStart,
  fetchWorkoutsSuccess,
  fetchWorkoutsFailure,
  setCurrentWorkout,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  addFormFeedback,
  clearError,
} = workoutSlice.actions;

export default workoutSlice.reducer; 