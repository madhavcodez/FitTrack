import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './index';

export interface Workout {
  _id: string;
  name: string;
  type: string;
  exercises: Exercise[];
  duration: number;
  date: string;
  difficulty: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5001/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Workout'],
  endpoints: (builder) => ({
    getWorkouts: builder.query<Workout[], void>({
      query: () => 'workouts',
      providesTags: ['Workout'],
    }),
    getWorkout: builder.query<Workout, string>({
      query: (id) => `workouts/${id}`,
      providesTags: ['Workout'],
    }),
    addWorkout: builder.mutation<Workout, Partial<Workout>>({
      query: (workout) => ({
        url: 'workouts',
        method: 'POST',
        body: workout,
      }),
      invalidatesTags: ['Workout'],
    }),
    updateWorkout: builder.mutation<Workout, { id: string; workout: Partial<Workout> }>({
      query: ({ id, workout }) => ({
        url: `workouts/${id}`,
        method: 'PUT',
        body: workout,
      }),
      invalidatesTags: ['Workout'],
    }),
    deleteWorkout: builder.mutation<void, string>({
      query: (id) => ({
        url: `workouts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Workout'],
    }),
  }),
});

export const {
  useGetWorkoutsQuery,
  useGetWorkoutQuery,
  useAddWorkoutMutation,
  useUpdateWorkoutMutation,
  useDeleteWorkoutMutation,
} = api; 