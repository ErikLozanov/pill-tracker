// src/routes/pill.routes.ts

import { Router, Request, Response, NextFunction } from 'express';
import * as pillController from '../controllers/pill.controller';

const router = Router();

// Final custom API Auth Middleware (Best practice for Clerk Express APIs)
const requireApiAuth = (req: Request, res: Response, next: NextFunction) => {
  // Uses the 'auth' object populated by the global clerkMiddleware (in index.ts)
  const auth = req.auth; 

  if (!auth || !auth.userId) {
    // Return a JSON 401 error, as required for an API
    return res.status(401).json({ 
      message: "Unauthorized", 
      reason: "No valid session or expired token." 
    });
  }
  
  // User is authenticated, proceed
  next();
};

// Apply the authentication middleware to all pill routes
router.use(requireApiAuth); 

router.get('/', pillController.getPills);
router.post('/', pillController.addPill);
router.post('/:id/log', pillController.logPill);
router.get('/:id', pillController.getPillById);
router.put('/:id', pillController.updatePill);
router.delete('/:id', pillController.deletePill);
router.post('/:id/undo', pillController.undoPill);

export default router;