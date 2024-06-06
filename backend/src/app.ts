import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import dutyRoutes from './routes/dutyRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/duties', dutyRoutes);
app.use(errorHandler);

export default app;
