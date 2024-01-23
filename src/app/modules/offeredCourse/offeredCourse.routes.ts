import express from 'express';
import validateRequest from '../../middlewers/validateRequest';
import { offeredCourseControllers } from './offeredCourse.controller';
import { offeredCourseValidations } from './offeredCourse.validation';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(offeredCourseValidations.createOfferedCourseValidationSchema),
  offeredCourseControllers.createOfferedCourse,
);
router.patch(
  '/:id',
  validateRequest(offeredCourseValidations.updateOfferedCourseValidationSchema),
  offeredCourseControllers.updateOfferedCourse,
);

export const offeredCourseRoutes = router;
