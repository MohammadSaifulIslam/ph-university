import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';

const createCourseIntoDb = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDb = async (query: Record<string, unknown>) => {
  const courseSearchableFields = ['title', 'code', 'prefix'];
  const courseQuery = new QueryBuilder(Course.find(), query)
    .filter()
    .search(courseSearchableFields)
    .paginate()
    .sort();
  const result = await courseQuery.modelQuery.populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const getSingleCourseFromDb = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const updateCourseIntoDb = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;
  const seassion = await mongoose.startSession();
  try {
    await seassion.startTransaction();

    // step -01 update basic data
    const updatedBasicCourseInfo = Course.findByIdAndUpdate(
      id,
      remainingCourseData,
      {
        new: true,
        runValidators: true,
        seassion,
      },
    );
    if (!updatedBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to update course');
    }

    // step-02 delete preRecuisiteCourse

    if (preRequisiteCourses && preRequisiteCourses.length) {
      const deletedPreRecuisite = preRequisiteCourses
        ?.filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      const deletedPreRecuisiteCourse = Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRecuisite } },
          },
        },
        { seassion },
      );

      console.log(deletedPreRecuisite, deletedPreRecuisiteCourse);

      if (!deletedPreRecuisiteCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Faild to update course');
      }

      const addedPreRecuisite = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted,
      );

      console.log(addedPreRecuisite);
      const addedPreRecuisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: addedPreRecuisite } },
        },
        { seassion },
      );

      if (!addedPreRecuisiteCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Faild to update course');
      }
    }

    await seassion.commitTransaction();
    await seassion.endSession();

    const result = await Course.findById(id);
    return result;
  } catch {
    await seassion.abortTransaction();
    await seassion.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Faild to update course');
  }
};

const deleteCourseFromDb = async (id: string) => {
  const result = await Course.findByIdAndDelete(id);
  return result;
};

const createFacultyIntoCourseIntoDb = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  // console.log(payload);
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    { upsert: true, new: true },
  );
  return result;
};

const deleteFacultyFromCourseFromDb = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  // console.log(payload);
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    { upsert: true, new: true },
  );
  return result;
};

export const courseServices = {
  createCourseIntoDb,
  getAllCourseFromDb,
  getSingleCourseFromDb,
  updateCourseIntoDb,
  deleteCourseFromDb,
  createFacultyIntoCourseIntoDb,
  deleteFacultyFromCourseFromDb,
};
