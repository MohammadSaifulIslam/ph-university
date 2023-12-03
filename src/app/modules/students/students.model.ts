import { Schema, model } from 'mongoose';
import { TGaurdian, TLocalGuardian, TStudent } from './students.interface';

const GaurdianSchema = new Schema<TGaurdian>({
  fatherName: { type: String, required: [true, 'Father name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required'],
  },
  motherName: { type: String, required: [true, 'Mother name is required'] },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required'],
  },
});

const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'Local guardian name is required'] },
  occupation: { type: String },
  relation: {
    type: String,
    required: [true, 'Relation with local guardian is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required'],
  },
});

const StudentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      firstName: {
        type: String,
        required: [true, 'First name is required'],
      },
      lastName: { type: String, required: [true, 'Last name is required'] },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Gender is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
      required: [true, 'Blood group is required'],
    },
    dateOfBirth: { type: String },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
      required: [true, 'Profile Image is required'],
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: [true, 'Admission Semester is required'],
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: [true, 'Academic Department is required'],
    },
    gaurdian: {
      type: GaurdianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: LocalGuardianSchema,
      required: [true, 'Local guardian information is required'],
    },
  },
  {
    timestamps: true,
  },
);

const Student = model<TStudent>('Student', StudentSchema);

export default Student;
