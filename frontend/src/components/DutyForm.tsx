import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Duty } from '../types/duty'; // Add this import

interface DutyFormProps {
  addDuty: (duty: Duty) => void;
}

const DutyForm: React.FC<DutyFormProps> = ({ addDuty }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    addDuty({ title, description, completed: false });
    setTitle('');
    setDescription('');
  };

  return (
    <Form layout="inline" onFinish={handleSubmit}>
      <Form.Item>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Duty
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DutyForm;
