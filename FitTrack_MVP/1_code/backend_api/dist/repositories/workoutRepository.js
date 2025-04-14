"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutRepository = void 0;
const firebase_1 = require("../firebase");
// Collection name in Firestore
const COLLECTION_NAME = 'workouts';
/**
 * WorkoutRepository class - handles all Firestore operations for workouts
 */
class WorkoutRepository {
    /**
     * Get all workouts for a specific user
     */
    async getUserWorkouts(userId) {
        try {
            const snapshot = await firebase_1.db
                .collection(COLLECTION_NAME)
                .where('userId', '==', userId)
                .orderBy('date', 'desc')
                .get();
            return snapshot.docs.map(doc => {
                var _a, _b, _c, _d, _e, _f;
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    // Convert Firestore Timestamps to ISO strings
                    date: ((_b = (_a = data.date) === null || _a === void 0 ? void 0 : _a.toDate) === null || _b === void 0 ? void 0 : _b.call(_a)) ? data.date.toDate().toISOString() : data.date,
                    createdAt: ((_d = (_c = data.createdAt) === null || _c === void 0 ? void 0 : _c.toDate) === null || _d === void 0 ? void 0 : _d.call(_c)) ? data.createdAt.toDate().toISOString() : data.createdAt,
                    updatedAt: ((_f = (_e = data.updatedAt) === null || _e === void 0 ? void 0 : _e.toDate) === null || _f === void 0 ? void 0 : _f.call(_e)) ? data.updatedAt.toDate().toISOString() : data.updatedAt
                };
            });
        }
        catch (error) {
            console.error('Error getting user workouts:', error);
            throw error;
        }
    }
    /**
     * Get a specific workout by ID
     */
    async getWorkoutById(workoutId) {
        var _a, _b, _c, _d, _e, _f;
        try {
            const doc = await firebase_1.db.collection(COLLECTION_NAME).doc(workoutId).get();
            if (!doc.exists) {
                return null;
            }
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                // Convert Firestore Timestamps to ISO strings
                date: ((_b = (_a = data.date) === null || _a === void 0 ? void 0 : _a.toDate) === null || _b === void 0 ? void 0 : _b.call(_a)) ? data.date.toDate().toISOString() : data.date,
                createdAt: ((_d = (_c = data.createdAt) === null || _c === void 0 ? void 0 : _c.toDate) === null || _d === void 0 ? void 0 : _d.call(_c)) ? data.createdAt.toDate().toISOString() : data.createdAt,
                updatedAt: ((_f = (_e = data.updatedAt) === null || _e === void 0 ? void 0 : _e.toDate) === null || _f === void 0 ? void 0 : _f.call(_e)) ? data.updatedAt.toDate().toISOString() : data.updatedAt
            };
        }
        catch (error) {
            console.error('Error getting workout by ID:', error);
            throw error;
        }
    }
    /**
     * Create a new workout
     */
    async createWorkout(workout) {
        try {
            const now = new Date();
            const workoutData = {
                ...workout,
                createdAt: now,
                updatedAt: now
            };
            const docRef = await firebase_1.db.collection(COLLECTION_NAME).add(workoutData);
            return {
                id: docRef.id,
                ...workoutData,
                date: workoutData.date instanceof Date ? workoutData.date.toISOString() : workoutData.date,
                createdAt: now.toISOString(),
                updatedAt: now.toISOString()
            };
        }
        catch (error) {
            console.error('Error creating workout:', error);
            throw error;
        }
    }
    /**
     * Update an existing workout
     */
    async updateWorkout(workoutId, workout) {
        var _a, _b, _c, _d, _e, _f;
        try {
            const workoutRef = firebase_1.db.collection(COLLECTION_NAME).doc(workoutId);
            const workoutDoc = await workoutRef.get();
            if (!workoutDoc.exists) {
                return null;
            }
            const updateData = {
                ...workout,
                updatedAt: new Date()
            };
            await workoutRef.update(updateData);
            // Get the updated document
            const updatedDoc = await workoutRef.get();
            const data = updatedDoc.data();
            return {
                id: updatedDoc.id,
                ...data,
                date: ((_b = (_a = data.date) === null || _a === void 0 ? void 0 : _a.toDate) === null || _b === void 0 ? void 0 : _b.call(_a)) ? data.date.toDate().toISOString() : data.date,
                createdAt: ((_d = (_c = data.createdAt) === null || _c === void 0 ? void 0 : _c.toDate) === null || _d === void 0 ? void 0 : _d.call(_c)) ? data.createdAt.toDate().toISOString() : data.createdAt,
                updatedAt: ((_f = (_e = data.updatedAt) === null || _e === void 0 ? void 0 : _e.toDate) === null || _f === void 0 ? void 0 : _f.call(_e)) ? data.updatedAt.toDate().toISOString() : data.updatedAt
            };
        }
        catch (error) {
            console.error('Error updating workout:', error);
            throw error;
        }
    }
    /**
     * Delete a workout
     */
    async deleteWorkout(workoutId) {
        try {
            const workoutRef = firebase_1.db.collection(COLLECTION_NAME).doc(workoutId);
            const workoutDoc = await workoutRef.get();
            if (!workoutDoc.exists) {
                return false;
            }
            await workoutRef.delete();
            return true;
        }
        catch (error) {
            console.error('Error deleting workout:', error);
            throw error;
        }
    }
}
exports.WorkoutRepository = WorkoutRepository;
