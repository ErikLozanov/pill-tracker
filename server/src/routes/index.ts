import { Router } from 'express';
import pillRoutes from './pill.routes';

const router = Router();

router.use('/pills', pillRoutes);

export default router;