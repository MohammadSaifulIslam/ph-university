import mongoose, { Schema } from 'mongoose';
import { TSemesterRegistation } from './semesterRegistation.interface';

const semesterRegistrationSchema = new Schema<TSemesterRegistation>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Semester is required'],
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: ['UPCOMING', 'ONGOING', 'ENDED'],
      required: [true, 'Status is required'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start Date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End Date is required'],
    },
    minCredit: {
      type: Number,
      required: [true, 'Minimum Credit is required'],
      default: 3,
    },
    maxCredit: {
      type: Number,
      required: [true, 'Maximum Credit is required'],
      default: 15,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const SemesterRegistation = mongoose.model(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
