import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import DutyForm from '../src/components/DutyForm';
import { Duty } from '../src/types/duty';

test('renders DutyForm and adds a duty with validation', async () => {
  const mockAddDuty = jest.fn();
  render(<DutyForm addDuty={mockAddDuty} />);

  const addButton = screen.getByText('Add Duty');

  // Click the add button without entering values to trigger validation errors
  await act(async () => {
    fireEvent.click(addButton);
  });

  expect(screen.getByText('Please enter the title')).toBeInTheDocument();
  expect(screen.getByText('Please enter the description')).toBeInTheDocument();
  expect(mockAddDuty).not.toHaveBeenCalled();

  // Fill out the form fields
  await act(async () => {
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test Duty' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Test Description' } });
  });

  // Click the add button again
  await act(async () => {
    fireEvent.click(addButton);
  });

  expect(screen.queryByText('Please enter the title')).not.toBeInTheDocument();
  expect(screen.queryByText('Please enter the description')).not.toBeInTheDocument();
  expect(mockAddDuty).toHaveBeenCalledWith({
    title: 'Test Duty',
    description: 'Test Description',
    completed: false,
  });
});
