import express from 'express';
import validateRequest from '../../middlewers/validateRequest';

import { FacultyControllers } from './faculty.controllers';
import { updateFacultyValidationSchema } from './faculty.validations';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
