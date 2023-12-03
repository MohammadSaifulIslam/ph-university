import { Router } from 'express';
import validateRequest from '../../middlewers/validateRequest';
import { academicDepartmentControllers } from './academicDepartment.controllers';
import { academicDepartmentValidations } from './academicDepartment.validations';

const router = Router();

router.post(
  '/create-academic-department',
  validateRequest(
    academicDepartmentValidations.createAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.createAcademicDepartment,
);
router.get('/', academicDepartmentControllers.getAllAcademicDepartment);
router.get('/:id', academicDepartmentControllers.getSingleAcademicDepartment);
router.patch(
  '/:id',
  validateRequest(
    academicDepartmentValidations.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);
export const academicDepartmentRoutes = router;
