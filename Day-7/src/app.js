import express from 'express'
import cookieParser from 'cookie-parser'

import { dbConnect } from './db/db.js';
import authRouter from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(cookieParser())


dbConnect();

app.use('/auth', authRouter)

export default app;