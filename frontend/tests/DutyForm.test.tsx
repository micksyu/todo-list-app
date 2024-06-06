import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import DutyForm from '../src/components/DutyForm';
import { Duty } from '../src/types/duty';

test('renders DutyForm and adds a duty', async () => {
  const mockAddDuty = jest.fn();
  render(<DutyForm addDuty={mockAddDuty} />);

  const titleInput = screen.getByPlaceholderText('Title');
  const descriptionInput = screen.getByPlaceholderText('Description');
  const addButton = screen.getByRole('button', { name: /add duty/i });

  await act(async () => {
    fireEvent.change(titleInput, { target: { value: 'Test Duty' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(addButton);
  });

  expect(mockAddDuty).toHaveBeenCalledWith({
    title: 'Test Duty',
    description: 'Test Description',
    completed: false,
  });

  expect(titleInput).toHaveValue('');
  expect(descriptionInput).toHaveValue('');
});
