import { Types } from 'mongoose';

export type TGaurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  relation: string;
  contactNo: string;
  address: string;
};
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  gaurdian: TGaurdian;
  localGuardian: TLocalGuardian;
  profileImage: string;
  isDeleted: boolean;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
};
