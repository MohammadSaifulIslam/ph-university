import mongoose, { Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';

const AcademicSemesterModel = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: ['Autumn', 'Summer', 'Fall'],
      required: [true, 'Academic semester name is required'],
    },
    year: {
      type: String,
      required: [true, 'Academic semester year is required'],
    },
    code: {
      type: String,
      enum: ['01', '02', '03'],
      required: [true, 'Academic semester code is required'],
    },
    startMonth: {
      type: String,
      enum: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      required: [
        true,
        'Start month is required and must be one of: January, February, ..., December',
      ],
    },
    endMonth: {
      type: String,
      enum: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      required: [
        true,
        'End month is required and must be one of: January, February, ..., December',
      ],
    },
  },
  { timestamps: true },
);

const AcademicSemester = mongoose.model<TAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterModel,
);

export default AcademicSemester;
