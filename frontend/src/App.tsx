import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Duty } from './types/duty';
import DutyList from './components/DutyList';
import DutyForm from './components/DutyForm';
import DeleteModal from './components/DeleteModal'; // Add this import

const App: React.FC = () => {
  const [duties, setDuties] = useState<Duty[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dutyToDelete, setDutyToDelete] = useState<number | null>(null);

  const fetchDuties = async () => {
    const response = await axios.get('/api/duties');
    setDuties(response.data);
  };

  useEffect(() => {
    fetchDuties();
  }, []);

  const addDuty = async (duty: Duty) => {
    const response = await axios.post('/api/duties', duty);
    setDuties([...duties, response.data]);
  };

  const deleteDuty = async (id: number) => {
    await axios.delete(`/api/duties/${id}`);
    setDuties(duties.filter((duty) => duty.id !== id));
    setIsModalVisible(false);
  };

  const showDeleteModal = (id: number) => {
    setDutyToDelete(id);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="App">
      <h1>Duty Management</h1>
      <DutyForm addDuty={addDuty} />
      <DutyList duties={duties} deleteDuty={showDeleteModal} />
      <DeleteModal
        isVisible={isModalVisible}
        onConfirm={() => deleteDuty(dutyToDelete!)}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default App;
