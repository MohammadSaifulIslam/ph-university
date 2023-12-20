import { z } from 'zod';

// Define the Zod schema for TPreRequisiteCourses
const createPreRequisiteCoursesSchema = z.object({
  course: z.string().min(1, 'CourseId is required'),
  isDeleted: z.boolean().default(false),
});

// Define the Zod schema for TCourse
const createCourseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  prefix: z.string().min(1, 'Prefix is required'),
  code: z
    .number()
    .int('Code must be an integer')
    .positive('Code must be positive'),
  credits: z
    .number()
    .int('Credits must be an integer')
    .positive('Credits must be positive'),
  preRequisiteCourses: z.array(createPreRequisiteCoursesSchema).default([]),
});

export const courseValidation = {
  createCourseSchema,
};
