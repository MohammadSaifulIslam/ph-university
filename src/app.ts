import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewers/globalErrorHandler';
import { studentRoutes } from './app/modules/students/students.routes';
import { userRouter } from './app/modules/users/users.routes';
const app: Application = express();

// parser
app.use(cors());
app.use(express.json());

// application routes
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the PH University Server');
});

// global error handler
app.use(globalErrorHandler);
export default app;
