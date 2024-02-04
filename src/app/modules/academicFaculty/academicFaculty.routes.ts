import { Router } from 'express';
import auth from '../../middlewers/auth';
import validateRequest from '../../middlewers/validateRequest';
import { USER_ROLE } from '../users/users.constant';
import { academicFacultyControllers } from './academicFaculty.controllers';
import { academicFacultyValidations } from './academicFaculty.validations';

const router = Router();

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.createAcademicFaculty,
);
router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  academicFacultyControllers.getAllAcademicFaculty,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  academicFacultyControllers.getSingleAcademicFaculty,
);
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicFacultyValidations.updateAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.updateAcademicFaculty,
);
export const academicFacultyRoutes = router;
