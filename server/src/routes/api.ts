import express from 'express';
import { generatePortfolio } from '../controllers/generator';
import { saveTemplate, loadTemplate } from '../controllers/configController';

const router = express.Router();

router.post('/download', generatePortfolio);
router.post('/save', saveTemplate);
router.get('/load/:id', loadTemplate);

// TODO: standard save/load routes if using MongoDB
router.get('/health', (req, res) => res.json({ status: 'ok' }));

export default router;
