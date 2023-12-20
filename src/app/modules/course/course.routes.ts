import express from 'express';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post('/create-course', CourseControllers.createCourse);
router.get('/', CourseControllers.getAllCourse);

router.get('/:id', CourseControllers.getSingleCourse);

router.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoutes = router;
