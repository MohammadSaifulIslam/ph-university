import { z } from 'zod';

const createGaurdianValidationSchema = z.object({
  fatherName: z.string().min(1).max(255),
  fatherOccupation: z.string().min(1).max(255),
  fatherContactNo: z.string().min(1).max(20),
  motherName: z.string().min(1).max(255),
  motherOccupation: z.string().min(1).max(255),
  motherContactNo: z.string().min(1).max(20),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string().min(1).max(255),
  occupation: z.string().min(1).max(255),
  relation: z.string().min(1).max(255),
  contactNo: z.string().min(1).max(20),
  address: z.string().min(1).max(500),
});

const createStudentValidationSchema = z.object({
  password: z.string().min(8),
  student: z.object({
    name: z.object({
      firstName: z.string().min(1).max(255),
      lastName: z.string().min(1).max(255),
    }),
    email: z.string().min(1).max(255).email(),
    contactNo: z.string().min(1).max(20),
    emergencyContactNo: z.string().min(1).max(20),
    gender: z.enum(['male', 'female', 'other']),
    bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']),
    dateOfBirth: z.string().min(1).max(255),
    presentAddress: z.string().min(1).max(500),
    permanentAddress: z.string().min(1).max(500),
    gaurdian: createGaurdianValidationSchema,
    localGuardian: createLocalGuardianValidationSchema,
    profileImage: z.string(),
    admissionSemester: z.string(),
  }),
});

const updateGaurdianValidationSchema = z.object({
  fatherName: z.string().min(1).max(255).optional(),
  fatherOccupation: z.string().min(1).max(255).optional(),
  fatherContactNo: z.string().min(1).max(20).optional(),
  motherName: z.string().min(1).max(255).optional(),
  motherOccupation: z.string().min(1).max(255).optional(),
  motherContactNo: z.string().min(1).max(20).optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  occupation: z.string().min(1).max(255).optional(),
  relation: z.string().min(1).max(255).optional(),
  contactNo: z.string().min(1).max(20).optional(),
  address: z.string().min(1).max(500).optional(),
});

const updateStudentValidationSchema = z.object({
  student: z.object({
    name: z.object({
      firstName: z.string().min(1).max(255).optional(),
      lastName: z.string().min(1).max(255).optional(),
    }),
    email: z.string().min(1).max(255).email().optional(),
    contactNo: z.string().min(1).max(20).optional(),
    emergencyContactNo: z.string().min(1).max(20).optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
      .optional(),
    dateOfBirth: z.string().min(1).max(255).optional(),
    presentAddress: z.string().min(1).max(500).optional(),
    permanentAddress: z.string().min(1).max(500).optional(),
    gaurdian: updateGaurdianValidationSchema.optional(),
    localGuardian: updateLocalGuardianValidationSchema.optional(),
    profileImage: z.string().optional(),
    admissionSemester: z.string().optional(),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
