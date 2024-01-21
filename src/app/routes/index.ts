import { Router } from 'express';
import { AdminRoutes } from '../modules/Admin/admin.routes';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { CourseRoutes } from '../modules/course/course.routes';
import { FacultyRoutes } from '../modules/faculty/faculty.routes';
import { offeredCourseRoutes } from '../modules/offeredCourse/offeredCourse.routes';

import { semesterRegistrationRoute } from '../modules/semesterRegistation/semesterRegistation.routes';
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
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-registaions',
    route: semesterRegistrationRoute,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRoutes,
  },
  {
    path: '/offered-courses',
    route: offeredCourseRoutes,
  },
];

pathRouter.map((route) => router.use(route.path, route.route));

export default router;
