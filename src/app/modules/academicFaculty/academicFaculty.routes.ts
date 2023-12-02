import { Router } from 'express';
import validateRequest from '../../middlewers/validateRequest';
import { academicFacultyControllers } from './academicFaculty.controllers';
import { academicFacultyValidations } from './academicFaculty.validations';

const router = Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    academicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.createAcademicFaculty,
);
router.get('/', academicFacultyControllers.getAllAcademicFaculty);
router.get('/:id', academicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  '/:id',
  validateRequest(
    academicFacultyValidations.updateAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.updateAcademicFaculty,
);
export const academicFacultyRoutes = router;
