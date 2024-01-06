import express from 'express';
import { offeredCourseControllers } from './offeredCourse.controller';

const router = express.Router();

router.post(
  '/create-offered-course',
  offeredCourseControllers.createOfferedCoures,
);

export const offeredCourseRouter = router;
