"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.db = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initialize Firebase first
try {
    firebase_admin_1.default.initializeApp({
        projectId: 'fittrack-demo',
    });
    console.log('Firebase initialized with mock configuration');
}
catch (error) {
    console.error('Error initializing Firebase:', error);
}
// Export Firestore database and auth for use in other modules
exports.db = firebase_admin_1.default.firestore();
exports.auth = firebase_admin_1.default.auth();
