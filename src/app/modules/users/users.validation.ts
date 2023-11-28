import z from 'zod';

export const userValidationSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be 8 characters' })
    .optional(),
  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  isDeleted: z.boolean().default(false),
});
