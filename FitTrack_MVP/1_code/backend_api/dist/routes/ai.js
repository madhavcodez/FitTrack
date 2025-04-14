"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Health check endpoint for AI service
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'ai' });
});
exports.default = router;
