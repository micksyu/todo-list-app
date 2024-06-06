import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import DutyList from '../src/components/DutyList';
import { Duty } from '../src/types/duty';
import DeleteModal from '../src/components/DeleteModal';

const duties: Duty[] = [
  { id: 1, title: 'Duty 1', description: 'Description 1', completed: false },
  { id: 2, title: 'Duty 2', description: 'Description 2', completed: false },
];

test('renders DutyList and deletes a duty', async () => {
  const mockDeleteDuty = jest.fn();
  const mockOnCancel = jest.fn();
  const mockOnConfirm = jest.fn();

  render(
    <>
      <DutyList duties={duties} deleteDuty={mockDeleteDuty} />
      <DeleteModal isVisible={true} onConfirm={mockOnConfirm} onCancel={mockOnCancel} />
    </>
  );

  const deleteButtons = screen.getAllByText('Delete');

  await act(async () => {
    fireEvent.click(deleteButtons[0]);
  });

  const confirmButton = screen.getByText('OK');
  await act(async () => {
    fireEvent.click(confirmButton);
  });

  expect(mockOnConfirm).toHaveBeenCalled();
});
