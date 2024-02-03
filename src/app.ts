import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewers/globalErrorHandler';
import notFound from './app/middlewers/notFound';
import router from './app/routes';

const app: Application = express();

// parser
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));
app.use(express.json());

// application routes
app.use('/api/v1', router);
console.log(process.cwd() + '/uploads');
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the PH University Server');
});

app.use(notFound);

// global error handler
app.use(globalErrorHandler);
export default app;
