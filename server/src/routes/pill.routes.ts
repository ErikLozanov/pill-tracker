// src/routes/pill.routes.ts
import { Router } from 'express';
import * as pillController from '../controllers/pill.controller';

const router = Router();

// GET http://localhost:3000/api/pills
router.get('/', pillController.getPills);

// POST http://localhost:3000/api/pills
router.post('/', pillController.addPill);
router.post('/:id/log', pillController.logPill);
export default router;