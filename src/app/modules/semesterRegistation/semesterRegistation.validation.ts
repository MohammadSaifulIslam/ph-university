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
  startDate: z.string().refine((time) => {
    const regaxValidation = /^([01]\d|2[0-3]):([0-5]\d)$/;
    regaxValidation.test(time);
  }),
  endDate: z.string().refine((time) => {
    const regaxValidation = /^([01]\d|2[0-3]):([0-5]\d)$/;
    regaxValidation.test(time);
  }),
  minCredit: z.number(),
  maxCredit: z.number(),
  isDeleted: z.string().optional(),
});

export const semesterRegistrationValidations = {
  createSemesterRegistrationSchema,
};
