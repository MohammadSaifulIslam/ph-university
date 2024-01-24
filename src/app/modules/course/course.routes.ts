import express from 'express';
import auth from '../../middlewers/auth';
import validateRequest from '../../middlewers/validateRequest';
import { USER_ROLE } from '../users/users.constant';
import { CourseControllers } from './course.controller';
import { courseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  validateRequest(courseValidation.createCourseSchema),
  CourseControllers.createCourse,
);
router.get('/', CourseControllers.getAllCourse);

router.get('/:id', CourseControllers.getSingleCourse);
router.patch('/:id', auth(USER_ROLE.admin), CourseControllers.updateCourse);
router.put(
  '/:courseId/assign-faculty',
  auth(USER_ROLE.admin),
  validateRequest(courseValidation.facultyWithCourseSchema),
  CourseControllers.assignCourseWithFaculty,
);
router.delete(
  '/:courseId/delete-faculty',
  auth(USER_ROLE.admin),
  validateRequest(courseValidation.facultyWithCourseSchema),
  CourseControllers.deleteCourseWithFaculty,
);

router.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoutes = router;
