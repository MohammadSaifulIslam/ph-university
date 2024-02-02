import express from 'express';
import auth from '../../middlewers/auth';
import validateRequest from '../../middlewers/validateRequest';
import { EnrolledCourseControllers } from './enrolledCourse.contoller';
import { EnrolledCourseValidations } from './enrolledCourse.validation';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

export const EnrolledCourseRoutes = router;
