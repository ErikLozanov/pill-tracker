import { Request, Response } from 'express';
import * as pillService from '../services/pill.service';

// Helper to extract Clerk User ID safely
const getUserId = (req: Request): string => {
  const auth = req.auth;
  
  if (!auth || !auth.userId) {
    throw new Error("Unauthorized: No User ID found");
  }
  return auth.userId;
};

// 1. Get All Pills
export const getPills = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const pills = await pillService.getAllPills(userId);
    res.status(200).json(pills);
  } catch (error) {
    console.error("Error getting pills:", error);
    // If the error is our manual "Unauthorized", send 401, otherwise 500
    if ((error as Error).message.includes("Unauthorized")) {
        res.status(401).json({ message: "Unauthorized" });
    } else {
        res.status(500).json({ message: "Error fetching pills" });
    }
  }
};

// 2. Add Pill
export const addPill = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const newPill = await pillService.createPill(userId, req.body);
    res.status(201).json(newPill);
  } catch (error) {
    console.error("Error adding pill:", error);
    res.status(500).json({ message: "Error adding pill" });
  }
};

// 3. Get Single Pill
export const getPillById = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const pill = await pillService.getPillById(Number(req.params.id), userId);
    
    if (!pill) {
       res.status(404).json({ message: "Pill not found" });
       return;
    }
    res.json(pill);
  } catch (error) {
    console.error("Error fetching pill:", error);
    res.status(500).json({ message: "Error fetching pill" });
  }
};

// 4. Update Pill
export const updatePill = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const updated = await pillService.updatePill(Number(req.params.id), userId, req.body);
    res.json(updated);
  } catch (error) {
    console.error("Error updating pill:", error);
    res.status(500).json({ message: "Error updating pill" });
  }
};

// 5. Delete Pill
export const deletePill = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    await pillService.deletePill(Number(req.params.id), userId);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting pill:", error);
    res.status(500).json({ message: "Error deleting pill" });
  }
};

// 6. Log Intake
export const logPill = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const log = await pillService.logIntake(Number(req.params.id), userId);
    res.status(201).json(log);
  } catch (error) {
    console.error("Error logging intake:", error);
    res.status(500).json({ message: "Error logging intake" });
  }
};

// 7. Undo Intake
export const undoPill = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    await pillService.undoLastIntake(Number(req.params.id), userId);
    res.json({ message: "Undone successfully" });
  } catch (error) {
    console.error("Error undoing intake:", error);
    res.status(500).json({ message: "Error undoing intake" });
  }
};