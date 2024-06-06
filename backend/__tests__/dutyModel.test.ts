import { getAllDuties, addDuty, updateDutyById, deleteDutyById } from '../src/services/dutyService';
import { Pool, QueryResult } from 'pg';
import { Duty } from '../types/duty';

jest.mock('pg', () => {
  const mPool = {
    query: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('Duty Model', () => {
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

    const result = await getAllDuties();

    expect(result).toEqual(duties);
  });

  it('should add a new duty', async () => {
    const newDuty: Duty = { title: 'New Duty', description: 'New Description', completed: false };
    const queryResult: QueryResult<Duty> = {
      rows: [{ ...newDuty, id: 1 }],
      command: '',
      rowCount: 1,
      oid: 0,
      fields: []
    };
    (pool.query as jest.Mock).mockResolvedValue(queryResult);

    const result = await addDuty(newDuty);

    expect(result).toEqual({ ...newDuty, id: 1 });
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

    const result = await updateDutyById(1, updatedDuty);

    expect(result).toEqual({ ...updatedDuty, id: 1 });
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

    await deleteDutyById(1);

    expect(pool.query).toHaveBeenCalledWith('DELETE FROM duties WHERE id = $1', [1]);
  });
});
