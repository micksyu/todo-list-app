import React, { useState } from 'react';
import { Duty } from '../types/duty';
import { List, Button, Modal, Form, Input, Checkbox } from 'antd';

interface DutyListProps {
  duties: Duty[];
  deleteDuty: (id: number) => void;
  updateDuty: (id: number, title: string, description: string, completed: boolean) => void;
}

const DutyList: React.FC<DutyListProps> = ({ duties, deleteDuty, updateDuty }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDuty, setEditingDuty] = useState<Duty | null>(null);
  const [form] = Form.useForm();

  const showModal = (duty: Duty) => {
    setEditingDuty(duty);
    setIsModalVisible(true);
    form.setFieldsValue({
      title: duty.title,
      description: duty.description,
      completed: duty.completed,
    });
  };

  const handleOk = (values: { title: string; description: string; completed: boolean }) => {
    if (editingDuty) {
      updateDuty(editingDuty.id!, values.title, values.description, values.completed);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="duty-list">
      <List
        dataSource={duties}
        renderItem={(duty) => (
          <List.Item>
            <div key={duty.id} className="duty-item">
              <span>{duty.title} - {duty.description}</span>
              <span><Button onClick={() => showModal(duty)}>Edit</Button></span>
              <span><Button danger onClick={() => deleteDuty(duty.id!)}>
                Delete
              </Button>
              </span>
              <span><Checkbox
                checked={duty.completed}
                onChange={(e) => updateDuty(duty.id!, duty.title, duty.description, e.target.checked)}
              >
                Completed
              </Checkbox>
              </span>
            </div>
          </List.Item>
        )}
      />
      <Modal
        title="Edit Duty"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {editingDuty && (
          <Form
            form={form}
            initialValues={{
              title: editingDuty.title,
              description: editingDuty.description,
              completed: editingDuty.completed,
            }}
            onFinish={handleOk}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please enter the title' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter the description' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="completed"
              valuePropName="checked"
            >
              <Checkbox>Completed</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                OK
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default DutyList;
