import React from 'react';
import { List, Button } from 'antd';
import { Duty } from '../types/duty';

interface DutyListProps {
  duties: Duty[];
  deleteDuty: (id: number) => void;
}

const DutyList: React.FC<DutyListProps> = ({ duties, deleteDuty }) => {
  return (
    <List
      bordered
      dataSource={duties}
      renderItem={(duty) => (
        <List.Item>
          {duty.title} - {duty.description}
          <Button type="primary" danger onClick={() => deleteDuty(duty.id!)}>
            Delete
          </Button>
        </List.Item>
      )}
    />
  );
};

export default DutyList;
