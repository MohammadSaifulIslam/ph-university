import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);

const createOfferedCourseValidationSchema = z.object({
  semesterRegistration: z.string().refine((val) => val.length > 0, {
    message: 'Semester registration is required.',
  }),
  academicFaculty: z.string().refine((val) => val.length > 0, {
    message: 'Academic faculty is required.',
  }),
  academicDepartment: z.string().refine((val) => val.length > 0, {
    message: 'Academic department is required.',
  }),
  course: z
    .string()
    .refine((val) => val.length > 0, { message: 'Course is required.' }),
  faculty: z
    .string()
    .refine((val) => val.length > 0, { message: 'Faculty is required.' }),
  maxCapacity: z.number().refine((val) => val > 0, {
    message: 'Maximum capacity must be greater than 0.',
  }),
  section: z
    .number()
    .refine((val) => val > 0, { message: 'Section must be greater than 0.' }),
  days: z.array(
    z
      .string()
      .refine((val) => [...Days].includes(val), { message: 'Invalid day.' }),
  ),
  startTime: timeStringSchema,
  endTime: timeStringSchema,
});

const updateOfferedCourseValidationSchema = z.object({
  faculty: z
    .string()
    .refine((val) => val.length > 0, { message: 'Faculty is required.' }),
  maxCapacity: z.number().refine((val) => val > 0, {
    message: 'Maximum capacity must be greater than 0.',
  }),
  days: z.array(
    z
      .string()
      .refine((val) => [...Days].includes(val), { message: 'Invalid day.' }),
  ),
  startTime: timeStringSchema,
  endTime: timeStringSchema,
});

export const offeredCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
