"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const workoutController_1 = require("../controllers/workoutController");
const router = express_1.default.Router();
// Protect all workout routes
router.use(authMiddleware_1.protect);
// Routes for /api/workouts
router.route('/')
    .get(workoutController_1.getWorkouts)
    .post(workoutController_1.createWorkout);
// Routes for /api/workouts/:workoutId
router.route('/:workoutId')
    .get(workoutController_1.getWorkout)
    .put(workoutController_1.updateWorkout)
    .delete(workoutController_1.deleteWorkout);
exports.default = router;
