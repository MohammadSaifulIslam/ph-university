import { Types } from 'mongoose';
import { z } from 'zod';

const createSemesterRegistrationSchema = z.object({
  academicSemester: z.string().refine(Types.ObjectId.isValid, {
    message: 'Invalid Academic Semester ID',
  }),
  status: z
    .enum(['UPCOMING', 'ONGOING', 'ENDED'])
    .refine((value) => typeof value === 'string', {
      message: 'Status must be a string',
    }),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  minCredit: z.number(),
  maxCredit: z.number(),
  isDeleted: z.string().optional(),
});

export const semesterRegistationValidations = {
  createSemesterRegistrationSchema,
};
