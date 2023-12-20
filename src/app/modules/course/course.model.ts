import mongoose, { Schema } from 'mongoose';

const preRequisiteCoursesSchema = new Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Course ID is required'],
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  prefix: {
    type: String,
    required: [true, 'Prefix is required'],
  },
  code: {
    type: Number,
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
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
