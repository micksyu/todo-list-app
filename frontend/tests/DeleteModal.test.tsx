import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import DeleteModal from '../src/components/DeleteModal';
import '@testing-library/jest-dom';


test('renders DeleteModal and handles confirm and cancel actions', async () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  render(
    <DeleteModal
      isVisible={true}
      onConfirm={mockOnConfirm}
      onCancel={mockOnCancel}
    />
  );

  expect(screen.getByText('Delete Confirmation')).toBeInTheDocument();
  expect(screen.getByText('Are you sure you want to delete this item?')).toBeInTheDocument();

  const confirmButton = screen.getByText('OK');
  const cancelButton = screen.getByText('Cancel');

  await act(async () => {
    fireEvent.click(confirmButton);
  });

  expect(mockOnConfirm).toHaveBeenCalled();

  await act(async () => {
    fireEvent.click(cancelButton);
  });

  expect(mockOnCancel).toHaveBeenCalled();
});
