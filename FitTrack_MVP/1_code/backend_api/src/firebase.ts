import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase first
try {
  admin.initializeApp({
    projectId: 'fittrack-demo',
  });
  console.log('Firebase initialized with mock configuration');
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

// Export Firestore database and auth for use in other modules
export const db = admin.firestore();
export const auth = admin.auth(); 