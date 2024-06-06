import pool from './db';

const createTableQuery = `
CREATE TABLE IF NOT EXISTS duties (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  completed BOOLEAN
);
`;

pool.query(createTableQuery)
  .then(() => console.log('Table created successfully'))
  .catch((err) => console.error('Error creating table:', err))
  .finally(() => pool.end());
