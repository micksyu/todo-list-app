import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DutyForm from '../src/components/DutyForm';
import { Duty } from '../src/types/duty';
import { message } from 'antd';

jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  message: {
    success: jest.fn(),
  },
}));

const mockAddDuty = jest.fn();

describe('DutyForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders DutyForm and adds a duty with validation', async () => {
    render(<DutyForm addDuty={mockAddDuty} />);

    const addButton = screen.getByText('Add Duty');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter the title')).toBeInTheDocument();
      expect(screen.getByText('Please enter the description')).toBeInTheDocument();
    });
    expect(mockAddDuty).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Duty' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test Description' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.queryByText('Please enter the title')).not.toBeInTheDocument();
      expect(screen.queryByText('Please enter the description')).not.toBeInTheDocument();
    });

    expect(mockAddDuty).toHaveBeenCalledWith({ title: 'Test Duty', description: 'Test Description', completed: false });
    expect(message.success).toHaveBeenCalledWith('Duty added successfully!');
  });
});
