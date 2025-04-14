import { Router } from 'express';

const router = Router();

// Health check endpoint for AI service
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'ai' });
});

export default router; 