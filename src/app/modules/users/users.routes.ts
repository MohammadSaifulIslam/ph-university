import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewers/auth';
import validateRequest from '../../middlewers/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';
import { createAdminValidationSchema } from '../Admin/admin.validations';
import { createFacultyValidationSchema } from '../faculty/faculty.validations';
import { studentValidations } from '../students/students.validation';
import { USER_ROLE } from './users.constant';
import { usersControllers } from './users.controllers';
import { userValidation } from './users.validation';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidations.createStudentValidationSchema),
  usersControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createFacultyValidationSchema),
  usersControllers.createFaculty,
);

router.post(
  '/create-admin',
  auth(USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createAdminValidationSchema),
  usersControllers.createAdmin,
);

router.post(
  '/change-status/:id',
  auth('admin', 'superAdmin'),
  validateRequest(userValidation.changeStatusValidationSchema),
  usersControllers.changeStatus,
);

router.get('/me', auth('student', 'faculty', 'admin'), usersControllers.getMe);

export const userRouter = router;
