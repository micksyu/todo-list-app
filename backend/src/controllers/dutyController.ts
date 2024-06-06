import { Request, Response } from 'express';
import { getAllDuties, addDuty, updateDutyById, deleteDutyById } from '../services/dutyService';

export const getDuties = async (req: Request, res: Response) => {
  try {
    const duties = await getAllDuties();
    res.status(200).json(duties);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch duties' });
  }
};

export const createDuty = async (req: Request, res: Response) => {
  try {
    const newDuty = await addDuty(req.body);
    res.status(201).json(newDuty);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create duty' });
  }
};

export const updateDuty = async (req: Request, res: Response) => {
  try {
    const updatedDuty = await updateDutyById(parseInt(req.params.id, 10), req.body);
    res.status(200).json(updatedDuty);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update duty' });
  }
};

export const deleteDuty = async (req: Request, res: Response) => {
  try {
    await deleteDutyById(parseInt(req.params.id, 10));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete duty' });
  }
};
