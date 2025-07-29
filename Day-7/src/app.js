import express from 'express'

import { dbConnect } from './db/db.js';
import authRouter from './routes/auth.routes.js';

const app = express();

app.use(express.json());

dbConnect();

app.use('/auth', authRouter)

export default app;