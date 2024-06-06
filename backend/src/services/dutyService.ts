import { query } from '../models/dutyModel';
import { Duty } from '../../types/duty';

export const getAllDuties = async (): Promise<Duty[]> => {
  const result = await query('SELECT * FROM duties');
  return result.rows;
};

export const addDuty = async (duty: Duty): Promise<Duty> => {
  const result = await query(
    'INSERT INTO duties (title, description, completed) VALUES ($1, $2, $3) RETURNING *',
    [duty.title, duty.description, duty.completed]
  );
  return result.rows[0];
};

export const updateDutyById = async (id: number, duty: Partial<Duty>): Promise<Duty> => {
  const result = await query(
    'UPDATE duties SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *',
    [duty.title, duty.description, duty.completed, id]
  );
  return result.rows[0];
};

export const deleteDutyById = async (id: number): Promise<void> => {
  await query('DELETE FROM duties WHERE id = $1', [id]);
};
