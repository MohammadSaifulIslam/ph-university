import { Schema, model } from 'mongoose';
import { Days } from './offeredCourse.constant';
import { TOfferedCourse } from './offeredCourse.interface';

const offeredCourseSchema = new Schema<TOfferedCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    required: [true, 'Semester registration is required.'],
    ref: 'SemesterRegistration',
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    required: [true, 'Academic semester is required.'],
    ref: 'AcademicSemester',
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: [true, 'Academic faculty is required.'],
    ref: 'AcademicFaculty',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: [true, 'Academic department is required.'],
    ref: 'AcademicDepartment',
  },
  course: {
    type: Schema.Types.ObjectId,
    required: [true, 'Course is required.'],
    ref: 'Course',
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: [true, 'Faculty is required.'],
    ref: 'Faculty',
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
  startTime: { type: String, required: [true, 'Start Time is required.'] },
  endTime: { type: String, required: [true, 'End Time is required.'] },
});

export const OfferedCourse = model<TOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
);
