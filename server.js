process.env.PORT || 3000;

import express from 'express';
import authRouter from './routes/auth.js';
import taskRouter from './routes/tasks.js';
import userRouter from './routes/users.js';
import errorHandler from './middleware/errorHandler.js';

import cors from "cors";
import morgan from "morgan";

const app = express();

if (!process.env.JWT_SECRET){
  console.error("JWT_SECRET is missing from .env");
  process.exit(1);
}

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});