import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from '../src/App';
import { Duty } from '../src/types/duty';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const duties: Duty[] = [
  { id: 1, title: 'Duty 1', description: 'Description 1', completed: false },
  { id: 2, title: 'Duty 2', description: 'Description 2', completed: false },
];

describe('App', () => {
  test('renders App and fetches duties', async () => {
    mockedAxios.get.mockResolvedValue({ data: duties });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Duty 1 - Description 1')).toBeInTheDocument();
      expect(screen.getByText('Duty 2 - Description 2')).toBeInTheDocument();
    });
  });
});
