/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import QueryBuilder from '../../builder/QueryBuilder';
import { TCourse } from './course.interface';
import Course from './course.model';

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

  // step -01 update basic data
  const updatedBasicCourseInfo = Course.findByIdAndUpdate(
    id,
    remainingCourseData,
    {
      new: true,
      runValidators: true,
    },
  );
  // step-02 delete preRecuisiteCourse
  let a;
  if (preRequisiteCourses && preRequisiteCourses.length) {
    const deletedPreRecuisite = preRequisiteCourses
      ?.filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    const deletedPreRecuisiteCourse = Course.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourses: { course: { $in: deletedPreRecuisite } } },
    });
    a = deletedPreRecuisiteCourse;

    const addedPreRecuisite = preRequisiteCourses.filter(
      (el) => el.course && !el.isDeleted,
    );

    console.log(addedPreRecuisite);
    const addedPreRecuisiteCourse = await Course.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourses: { $each: addedPreRecuisite } },
    });
  }

  const result = await Course.findById(id);
  return a;
};

const deleteCourseFromDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

export const courseServices = {
  createCourseIntoDb,
  getAllCourseFromDb,
  getSingleCourseFromDb,
  updateCourseIntoDb,
  deleteCourseFromDb,
};
