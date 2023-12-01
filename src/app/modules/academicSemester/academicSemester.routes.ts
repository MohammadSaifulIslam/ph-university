import { Router } from 'express';
import { academicSemesterControllers } from './acaddemicSemester.controllers';

const router = Router();

router.post(
  '/create-academic-semester',
  academicSemesterControllers.createAcademicSemester,
);
router.get('/', academicSemesterControllers.getAllAcademicSemester);
router.get('/:id', academicSemesterControllers.getSingleAcademicSemester);

export const academicSemesterRoutes = router;
