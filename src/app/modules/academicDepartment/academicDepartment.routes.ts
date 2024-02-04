import { Router } from 'express';
import auth from '../../middlewers/auth';
import validateRequest from '../../middlewers/validateRequest';
import { USER_ROLE } from '../users/users.constant';
import { academicDepartmentControllers } from './academicDepartment.controllers';
import { academicDepartmentValidations } from './academicDepartment.validations';

const router = Router();

router.post(
  '/create-academic-department',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicDepartmentValidations.createAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.createAcademicDepartment,
);
router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  academicDepartmentControllers.getAllAcademicDepartment,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  academicDepartmentControllers.getSingleAcademicDepartment,
);
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicDepartmentValidations.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);
export const academicDepartmentRoutes = router;
