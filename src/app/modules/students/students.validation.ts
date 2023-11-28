import { z } from 'zod';

const GaurdianValidationSchema = z.object({
  fatherName: z.string().min(1).max(255),
  fatherOccupation: z.string().min(1).max(255),
  fatherContactNo: z.string().min(1).max(20),
  motherName: z.string().min(1).max(255),
  motherOccupation: z.string().min(1).max(255),
  motherContactNo: z.string().min(1).max(20),
});

const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1).max(255),
  occupation: z.string().min(1).max(255),
  relation: z.string().min(1).max(255),
  contactNo: z.string().min(1).max(20),
  address: z.string().min(1).max(500),
});

const StudentValidationSchema = z.object({
  id: z.string().min(1).max(255),
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
  gaurdian: GaurdianValidationSchema,
  localGuardian: LocalGuardianValidationSchema,
});

export default StudentValidationSchema;
