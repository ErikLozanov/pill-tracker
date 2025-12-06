import { Request, Response } from 'express';
import * as pillService from '../services/pill.service';
import { MedicineForm, Frequency } from '@prisma/client';

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
    const body = req.body;

    // Validate required fields
    if (!body.name || !body.unit) {
       res.status(400).json({ message: "Name and Unit are required" });
       return;
    }

    const newPill = await pillService.createPill({ 
      name: body.name, 
      form: body.form as MedicineForm, 
      strength: body.strength, 
      amount: Number(body.amount), 
      unit: body.unit, 
      frequency: body.frequency as Frequency, 
      timesPerDay: Number(body.timesPerDay),  
      ...(body.currentStock && { currentStock: Number(body.currentStock) }),
      description: body.description 
    });
    
    res.status(201).json(newPill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding pill" });
  }
};

export const logPill = async (req: Request, res: Response) => {
  try {
    const pillId = Number(req.params.id);
    
    if (!pillId) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const log = await pillService.logIntake(pillId);
    res.status(201).json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging intake" });
  }
};