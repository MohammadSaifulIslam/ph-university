import express from 'express';
import { semesterRegistrationControllers } from './semesterRegistation.controller';

const router = express.Router();

router.post(
  '/create-semesterRegistration',
  semesterRegistrationControllers.createSemesterRegistration,
);
router.get('/', semesterRegistrationControllers.getAllSemesterRegistration);
router.get(
  '/:id',
  semesterRegistrationControllers.getSingleSemesterRegistration,
);
router.patch(
  '/:id',
  semesterRegistrationControllers.updateSemesterRegistration,
);

export const semesterRegistrationRoute = router;
