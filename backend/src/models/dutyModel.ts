import pool from '../db/db';

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};