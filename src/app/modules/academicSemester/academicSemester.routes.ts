import { Router } from 'express';
import { academicSemesterControllers } from './acaddemicSemester.controllers';

const router = Router();

router.post(
  '/create-academic-semester',
  academicSemesterControllers.createAcademicSemester,
);

export const academicSemesterRoutes = router;
