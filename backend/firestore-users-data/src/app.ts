import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes';
import jobRoutes from './routes/jobRoutes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(helmet());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);

export default app;
