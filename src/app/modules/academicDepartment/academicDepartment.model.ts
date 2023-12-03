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

AcademicDepartmentSchema.pre('save', async function (next) {
  const isAcademicDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isAcademicDepartmentExist) {
    throw new Error('Academic Depertment is already exist!');
  }
  next();
});
AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isAcademicDepartmentExist = await AcademicDepartment.findOne({ query });
  if (!isAcademicDepartmentExist) {
    throw new Error('Academic Depertment does not exist!');
  }
  next();
});

const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
);

export default AcademicDepartment;
