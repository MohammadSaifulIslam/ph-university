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

const deleteCourseFromDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

export const courseServices = {
  createCourseIntoDb,
  getAllCourseFromDb,
  getSingleCourseFromDb,
  deleteCourseFromDb,
};
