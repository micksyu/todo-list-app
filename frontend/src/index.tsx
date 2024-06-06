import 'antd/dist/reset.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!); // `container!` asserts that container is not null
root.render(<App />);
