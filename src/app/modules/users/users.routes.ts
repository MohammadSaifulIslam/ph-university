import express from 'express';
import validateRequest from '../../middlewers/validateRequest';
import { studentValidations } from '../students/students.validation';
import { usersControllers } from './users.controllers';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  usersControllers.createStudent,
);

export const userRouter = router;
