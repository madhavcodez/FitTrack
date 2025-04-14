"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const firebase_1 = require("../firebase");
/**
 * Middleware to verify Firebase JWT tokens
 * Extracts the token from the Authorization header and verifies it with Firebase Auth
 * If valid, attaches the user information to the request object
 */
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Unauthorized - No token provided' });
            return;
        }
        const token = authHeader.split('Bearer ')[1];
        try {
            const decodedToken = await firebase_1.auth.verifyIdToken(token);
            req.user = {
                uid: decodedToken.uid,
                email: decodedToken.email,
            };
            next();
        }
        catch (error) {
            console.error('Error verifying token:', error);
            res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
    }
    catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.authMiddleware = authMiddleware;
