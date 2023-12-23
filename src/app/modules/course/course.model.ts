import mongoose, { Schema } from 'mongoose';
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Course ID is required'],
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const courseSchema = new mongoose.Schema<TCourse>(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Title is required'],
    },
    prefix: {
      type: String,
      required: [true, 'Prefix is required'],
    },
    code: {
      type: Number,
      unique: true,
      required: [true, 'Code is required'],
    },
    credits: {
      type: Number,
      required: [true, 'Credits are required'],
    },
    preRequisiteCourses: {
      type: [preRequisiteCoursesSchema],
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Course = mongoose.model('Course', courseSchema);

const courseWithFacultySchema = new Schema<TCourseFaculty>(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Course ID is required'],
      unique: true,
      ref: 'Course',
    },
    faculties: {
      type: [mongoose.Schema.Types.ObjectId],
      required: [true, 'Faculty ID is required'],
      ref: 'Faculty',
    },
  },
  { timestamps: true },
);
export const CourseFaculty = mongoose.model(
  'CourseFaculty',
  courseWithFacultySchema,
);
