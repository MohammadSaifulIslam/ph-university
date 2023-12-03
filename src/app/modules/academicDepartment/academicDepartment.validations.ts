import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  name: z.string(),
  academicFaculty: z.string(),
});
const updateAcademicDepartmentValidationSchema = z.object({
  name: z.string().optional(),
  academicDepartment: z.string().optional(),
});

export const academicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
