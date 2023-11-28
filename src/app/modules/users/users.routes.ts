import express from 'express';
import { usersControllers } from './users.controllers';

const router = express.Router();

router.post('/create-student', usersControllers.createStudent);

export const userRouter = router;
