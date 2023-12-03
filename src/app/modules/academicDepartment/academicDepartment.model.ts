import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Faculty is required'],
      ref: 'AcademicFaculty',
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
  },
  { timestamps: true },
);

const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
);

export default AcademicDepartment;
