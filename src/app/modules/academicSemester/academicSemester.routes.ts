import { Router } from 'express';
import auth from '../../middlewers/auth';
import validateRequest from '../../middlewers/validateRequest';
import { USER_ROLE } from '../users/users.constant';
import { academicSemesterControllers } from './acaddemicSemester.controllers';
import { academicSemesterValidations } from './academicSemester.validations';

const router = Router();

router.post(
  '/create-academic-semester',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(academicSemesterValidations.createAcademicSemesterValidation),
  academicSemesterControllers.createAcademicSemester,
);
router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  academicSemesterControllers.getAllAcademicSemester,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  academicSemesterControllers.getSingleAcademicSemester,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(academicSemesterValidations.updateAcademicSemesterValidation),
  academicSemesterControllers.updateAcademicSemester,
);

export const academicSemesterRoutes = router;
