import React, { useState, useEffect } from 'react';
// import axios from './api/axiosInstance';
import axios from 'axios';
import { Duty } from './types/duty';
import DutyList from './components/DutyList';
import DutyForm from './components/DutyForm';
import DeleteModal from './components/DeleteModal';
import './styles/style.css'; // Import the CSS file

const App: React.FC = () => {
  const [duties, setDuties] = useState<Duty[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dutyToDelete, setDutyToDelete] = useState<number | null>(null);
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

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

  // const updateDuty = async (id: number, title: string, description: string) => {
  //   const response = await axios.put(`/api/duties/${id}`, { title, description });
  //   setDuties(duties.map((duty) => (duty.id === id ? response.data : duty)));
  // };

  const updateDuty = async (id: number, title: string, description: string, completed: boolean) => {
    try {
      const response = await axios.put(`/api/duties/${id}`, { title, description, completed });
      setDuties(duties.map((duty) => (duty.id === id ? response.data : duty)));
    } catch (error) {
      console.error('Error updating duty:', error);
    }
  };

  return (
    <div className="container">
      <h1>Duty Management</h1>
      <DutyForm addDuty={addDuty} />
      <DutyList duties={duties} deleteDuty={showDeleteModal} updateDuty={updateDuty} />
      <DeleteModal
        isVisible={isModalVisible}
        onConfirm={() => deleteDuty(dutyToDelete!)}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default App;
