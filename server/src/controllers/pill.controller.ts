import { Request, Response } from 'express';
import * as pillService from '../services/pill.service';

export const getPills = async (req: Request, res: Response) => {
  try {
    const pills = await pillService.getAllPills();
    res.status(200).json(pills);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pills" });
  }
};

export const addPill = async (req: Request, res: Response) => {
  try {
    const { name, dosage } = req.body;
    // Simple validation
    if (!name || !dosage) {
       res.status(400).json({ message: "Name and dosage are required" });
       return;
    }
    
    const newPill = await pillService.createPill(name, dosage);
    res.status(201).json(newPill);
  } catch (error) {
    res.status(500).json({ message: "Error adding pill" });
  }
};