import express from 'express';
import validateRequest from '../../middlewers/validateRequest';
import { createAdminValidationSchema } from '../Admin/admin.validations';
import { createFacultyValidationSchema } from '../faculty/faculty.validations';
import { studentValidations } from '../students/students.validation';
import { usersControllers } from './users.controllers';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  usersControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  usersControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  usersControllers.createAdmin,
);

export const userRouter = router;
