import express from 'express';
import validateRequest from '../../middlewers/validateRequest';
import { studentControllers } from './students.controller';
import { studentValidations } from './students.validation';
const router = express.Router();

router.get('/', studentControllers.getAllStudent);
router.get('/:id', studentControllers.getSingleStudent);
router.patch('/update-student/:id', studentControllers.updateStudent);
router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  studentControllers.deleteSingleStudent,
);

export const studentRoutes = router;
