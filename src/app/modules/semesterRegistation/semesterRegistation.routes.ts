import express from 'express';
import { semesterRegistationControllers } from './semesterRegistation.controller';

const router = express.Router();

router.post(
  '/create-semesterRegistation',
  semesterRegistationControllers.createSemesterRegistation,
);
router.get('/', semesterRegistationControllers.getAllSemesterRegistation);
router.get('/:id', semesterRegistationControllers.getSingleSemesterRegistation);
router.patch(
  '/:id',
  semesterRegistationControllers.updateSemesterRegistation,
);

export const semesterRegistationRoute = router;
