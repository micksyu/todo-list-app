import React from 'react';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import DutyList from '../src/components/DutyList';
import { Duty } from '../src/types/duty';

const duties: Duty[] = [
  { id: 1, title: 'Duty 1', description: 'Description 1', completed: false },
  { id: 2, title: 'Duty 2', description: 'Description 2', completed: false },
];

const mockDeleteDuty = jest.fn();
const mockUpdateDuty = jest.fn();

describe('DutyList', () => {
  beforeEach(() => {
    mockDeleteDuty.mockClear();
    mockUpdateDuty.mockClear();
  });

  test('renders duties and allows deletion', () => {
    render(<DutyList duties={duties} deleteDuty={mockDeleteDuty} updateDuty={mockUpdateDuty} />);

    expect(screen.getByText('Duty 1 - Description 1')).toBeInTheDocument();
    expect(screen.getByText('Duty 2 - Description 2')).toBeInTheDocument();

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    expect(mockDeleteDuty).toHaveBeenCalledWith(1);
  });

  test('allows editing duties', async () => {
    render(<DutyList duties={duties} deleteDuty={mockDeleteDuty} updateDuty={mockUpdateDuty} />);

    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    await act(async () => {
      const modal = screen.getByRole('dialog');
      const titleInput = within(modal).getByLabelText('Title');
      const descriptionInput = within(modal).getByLabelText('Description');
      const completedCheckbox = within(modal).getByLabelText('Completed', { selector: 'input[type="checkbox"]' });

      expect(titleInput).toHaveValue('Duty 1');
      expect(descriptionInput).toHaveValue('Description 1');
      expect(completedCheckbox).not.toBeChecked();

      fireEvent.change(titleInput, { target: { value: 'Updated Duty 1' } });
      fireEvent.change(descriptionInput, { target: { value: 'Updated Description 1' } });
      fireEvent.click(completedCheckbox);

      fireEvent.click(within(modal).getByText('OK'));
    });

    expect(mockUpdateDuty).toHaveBeenCalledWith(1, 'Updated Duty 1', 'Updated Description 1', true);
  });

  test('validates form fields', async () => {
    render(<DutyList duties={duties} deleteDuty={mockDeleteDuty} updateDuty={mockUpdateDuty} />);

    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    await act(async () => {
      const modal = screen.getByRole('dialog');
      const titleInput = within(modal).getByLabelText('Title');
      const descriptionInput = within(modal).getByLabelText('Description');

      fireEvent.change(titleInput, { target: { value: '' } });
      fireEvent.change(descriptionInput, { target: { value: '' } });

      fireEvent.click(within(modal).getByText('OK'));
    });

    expect(mockUpdateDuty).not.toHaveBeenCalled();
    expect(screen.getByText('Please enter the title')).toBeInTheDocument();
    expect(screen.getByText('Please enter the description')).toBeInTheDocument();
  });

  test('marks duty as completed', async () => {
    render(<DutyList duties={duties} deleteDuty={mockDeleteDuty} updateDuty={mockUpdateDuty} />);

    const dutyItem = screen.getByText('Duty 1 - Description 1').closest('.duty-item') as HTMLElement;
    const checkbox = within(dutyItem).getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(mockUpdateDuty).toHaveBeenCalledWith(1, 'Duty 1', 'Description 1', true);
  });
});
