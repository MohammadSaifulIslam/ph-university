import { Router } from 'express';
import auth from '../../middlewers/auth';
import validateRequest from '../../middlewers/validateRequest';
import { academicFacultyControllers } from './academicFaculty.controllers';
import { academicFacultyValidations } from './academicFaculty.validations';

const router = Router();

router.post(
  '/create-academic-faculty',
  auth('admin', 'superAdmin'),
  validateRequest(
    academicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.createAcademicFaculty,
);
router.get('/', academicFacultyControllers.getAllAcademicFaculty);
router.get('/:id', academicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  '/:id',
  auth('admin', 'superAdmin'),
  validateRequest(
    academicFacultyValidations.updateAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.updateAcademicFaculty,
);
export const academicFacultyRoutes = router;
