import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom"
import axios from 'axios';
// import axios from '../src//api/axiosInstance';
import App from '../src/App';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const duties = [
  { id: 1, title: 'Duty 1', description: 'Description 1' },
  { id: 2, title: 'Duty 2', description: 'Description 2' }
];

test('renders App and fetches duties', async () => {
  // console.log(mockedAxios);
  mockedAxios.get.mockResolvedValue({ data: duties });

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText('Duty 1 - Description 1')).toBeInTheDocument();
    expect(screen.getByText('Duty 2 - Description 2')).toBeInTheDocument();
    // expect(screen.getByText('Add Duty')).toBeInTheDocument();
  });
});
