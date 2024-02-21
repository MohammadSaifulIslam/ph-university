import express from 'express';
import auth from '../../middlewers/auth';
import validateRequest from '../../middlewers/validateRequest';
import { USER_ROLE } from '../users/users.constant';
import { CourseControllers } from './course.controller';
import { courseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(courseValidation.createCourseSchema),
  CourseControllers.createCourse,
);
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
  CourseControllers.getAllCourse,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseControllers.getSingleCourse,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  CourseControllers.updateCourse,
);
router.put(
  '/:courseId/assign-faculty',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(courseValidation.facultyWithCourseSchema),
  CourseControllers.assignCourseWithFaculty,
);
router.get(
  '/:courseId/get-faculty',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseControllers.getCourseWithFaculty,
);

router.delete(
  '/:courseId/delete-faculty',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(courseValidation.facultyWithCourseSchema),
  CourseControllers.deleteCourseWithFaculty,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  CourseControllers.deleteCourse,
);

export const CourseRoutes = router;
