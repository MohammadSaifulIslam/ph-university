import express from 'express';
import auth from '../../middlewers/auth';
import validateRequest from '../../middlewers/validateRequest';
import { USER_ROLE } from '../users/users.constant';
import { EnrolledCourseControllers } from './enrolledCourse.contoller';
import { EnrolledCourseValidations } from './enrolledCourse.validation';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

router.get(
  '/',
  auth(USER_ROLE.faculty, USER_ROLE.superAdmin, USER_ROLE.admin),
  EnrolledCourseControllers.getAllEnrolledCourses,
);

router.get(
  '/my-enrolled-courses',
  auth(USER_ROLE.student),
  EnrolledCourseControllers.getMyEnrolledCourses,
);

router.patch(
  '/update-enrolled-course-marks',
  auth(USER_ROLE.faculty),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;
