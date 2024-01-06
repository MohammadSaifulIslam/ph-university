import { Schema, model } from 'mongoose';
import { Days } from './offeredCourse.constant';
import { TOfferedCourse } from './offeredCourse.interface';

const offeredCourseSchema = new Schema<TOfferedCourse>({
  semesterRegistation: {
    type: Schema.Types.ObjectId,
    required: [true, 'Semester registration is required.'],
    ref: 'SemesterRegistation',
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    required: [true, 'Academic semester is required.'],
    ref: 'AcademicSemester',
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: [true, 'Academic faculty is required.'],
    ref: 'academicFaculty',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: [true, 'Academic department is required.'],
    ref: 'academicDepartment',
  },
  course: {
    type: Schema.Types.ObjectId,
    required: [true, 'Course is required.'],
    ref: 'course',
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: [true, 'Faculty is required.'],
    ref: 'faculty',
  },

  maxCapacity: {
    type: Number,
    required: [true, 'Maximum capacity is required.'],
  },
  section: { type: Number, required: [true, 'Section is required.'] },
  days: {
    type: [
      {
        type: String,
        enum: Days,
      },
    ],
    required: [true, 'Days are required.'],
  },
  startDate: { type: String, required: [true, 'Start date is required.'] },
  endDate: { type: String, required: [true, 'End date is required.'] },
});

export const OfferedCourse = model<TOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
);
