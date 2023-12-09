import express from 'express';
import validateRequest from '../../middlewers/validateRequest';
import { AdminControllers } from './admin.controllers';
import { updateAdminValidationSchema } from './admin.validations';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
