import express from 'express';
import validateRequest from '../../middlewers/validateRequest';
import { CourseControllers } from './course.controller';
import { courseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(courseValidation.createCourseSchema),
  CourseControllers.createCourse,
);
router.get('/', CourseControllers.getAllCourse);

router.get('/:id', CourseControllers.getSingleCourse);
router.patch(
  '/:id',

  CourseControllers.updateCourse,
);
router.put(
  '/:courseId/assign-faculty',
  validateRequest(courseValidation.facultyWithCourseSchema),
  CourseControllers.assignCourseWithFaculty,
);
router.delete(
  '/:courseId/delete-faculty',
  validateRequest(courseValidation.facultyWithCourseSchema),
  CourseControllers.deleteCourseWithFaculty,
);

router.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoutes = router;
