import express from 'express';
import validateRequest from '../../middlewers/validateRequest';

import auth from '../../middlewers/auth';
import { USER_ROLE } from '../users/users.constant';
import { FacultyControllers } from './faculty.controllers';
import { updateFacultyValidationSchema } from './faculty.validations';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  FacultyControllers.getAllFaculties,
);
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  FacultyControllers.getSingleFaculty,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  FacultyControllers.deleteFaculty,
);

export const FacultyRoutes = router;
