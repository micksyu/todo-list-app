import request from 'supertest';
import app from '../src/app';
import { Pool, QueryResult } from 'pg';
import { Duty } from '../types/duty';

jest.mock('pg', () => {
  const mPool = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('Duty Controller', () => {
  let pool: jest.Mocked<Pool>;

  beforeAll(() => {
    pool = new Pool() as jest.Mocked<Pool>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all duties', async () => {
    const duties: Duty[] = [{ id: 1, title: 'Test Duty', description: 'Test Description', completed: false }];
    const queryResult: QueryResult<Duty> = {
      rows: duties,
      command: '',
      rowCount: duties.length,
      oid: 0,
      fields: []
    };
    (pool.query as jest.Mock).mockResolvedValue(queryResult);

    const response = await request(app).get('/api/duties');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(duties);
  });

  it('should create a new duty', async () => {
    const newDuty: Duty = { title: 'New Duty', description: 'New Description', completed: false };
    const queryResult: QueryResult<Duty> = {
      rows: [{ ...newDuty, id: 1 }],
      command: '',
      rowCount: 1,
      oid: 0,
      fields: []
    };
    (pool.query as jest.Mock).mockResolvedValue(queryResult);

    const response = await request(app).post('/api/duties').send(newDuty);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ ...newDuty, id: 1 });
  });

  it('should update a duty', async () => {
    const updatedDuty: Duty = { title: 'Updated Duty', description: 'Updated Description', completed: true };
    const queryResult: QueryResult<Duty> = {
      rows: [{ ...updatedDuty, id: 1 }],
      command: '',
      rowCount: 1,
      oid: 0,
      fields: []
    };
    (pool.query as jest.Mock).mockResolvedValue(queryResult);

    const response = await request(app).put('/api/duties/1').send(updatedDuty);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ...updatedDuty, id: 1 });
  });

  it('should delete a duty', async () => {
    const queryResult: QueryResult<Duty> = {
      rows: [],
      command: '',
      rowCount: 0,
      oid: 0,
      fields: []
    };
    (pool.query as jest.Mock).mockResolvedValue(queryResult);

    const response = await request(app).delete('/api/duties/1');

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });
});
