import { Router } from 'express';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { studentRoutes } from '../modules/students/students.routes';
import { userRouter } from '../modules/users/users.routes';

const router = Router();

const pathRouter = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes,
  },
];

pathRouter.map((route) => router.use(route.path, route.route));

export default router;
