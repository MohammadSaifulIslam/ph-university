import { Router } from 'express';
import validateRequest from '../../middlewers/validateRequest';
import { academicSemesterControllers } from './acaddemicSemester.controllers';
import { academicSemesterValidations } from './academicSemester.validations';

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidations.createAcademicSemesterValidation),
  academicSemesterControllers.createAcademicSemester,
);
router.get('/', academicSemesterControllers.getAllAcademicSemester);
router.get('/:id', academicSemesterControllers.getSingleAcademicSemester);
router.patch(
  '/:id',
  validateRequest(academicSemesterValidations.updateAcademicSemesterValidation),
  academicSemesterControllers.updateAcademicSemester,
);
export const academicSemesterRoutes = router;
