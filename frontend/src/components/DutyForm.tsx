import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Duty } from '../types/duty';

interface DutyFormProps {
  addDuty: (duty: Duty) => Promise<void>;
}

const DutyForm: React.FC<DutyFormProps> = ({ addDuty }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async () => {
    let valid = true;

    if (title.trim() === '') {
      setTitleError('Please enter the title');
      valid = false;
    } else {
      setTitleError('');
    }

    if (description.trim() === '') {
      setDescriptionError('Please enter the description');
      valid = false;
    } else {
      setDescriptionError('');
    }

    if (valid) {
      await addDuty({ title, description, completed: false });
      setTitle('');
      setDescription('');
      setCompleted(false);
      message.success('Duty added successfully!');
    }
  };

  return (
    <form>
      <div className="ant-form-item">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ borderColor: titleError ? 'red' : '' }}
        />
        {titleError && <div style={{ color: 'red' }}>{titleError}</div>}
      </div>
      <div className="ant-form-item">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ borderColor: descriptionError ? 'red' : '' }}
        />
        {descriptionError && <div style={{ color: 'red' }}>{descriptionError}</div>}
      </div>
      <div className="ant-form-item">
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>
      </div>
      <button type="button" onClick={handleSubmit}>Add Duty</button>
    </form>
  );
};

export default DutyForm;
