import express from 'express';
import auth from '../../middlewers/auth';
import validateRequest from '../../middlewers/validateRequest';
import { createAdminValidationSchema } from '../Admin/admin.validations';
import { createFacultyValidationSchema } from '../faculty/faculty.validations';
import { usersControllers } from './users.controllers';
import { userValidation } from './users.validation';

const router = express.Router();

router.post(
  '/create-student',
  auth('admin'),
  // validateRequest(studentValidations.createStudentValidationSchema),
  usersControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth('admin'),
  validateRequest(createFacultyValidationSchema),
  usersControllers.createFaculty,
);

router.post(
  '/create-admin',
  auth('admin'),
  validateRequest(createAdminValidationSchema),
  usersControllers.createAdmin,
);

router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(userValidation.changeStatusValidationSchema),
  usersControllers.changeStatus,
);

router.get('/me', auth('student', 'faculty', 'admin'), usersControllers.getMe);

export const userRouter = router;
