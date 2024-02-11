import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { courseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDb(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course is created succesfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.getSingleCourseFromDb(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course is retrieved succesfully',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCourseFromDb(req.query);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Courses are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await courseServices.updateCourseIntoDb(id, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course is updated succesfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.deleteCourseFromDb(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course is deleted succesfully',
    data: result,
  });
});
const assignCourseWithFaculty = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await courseServices.createFacultyIntoCourseIntoDb(
    courseId,
    faculties,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Faculties assigned succesfully',
    data: result,
  });
});
const getCourseWithFaculty = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.getFacultyWithCourseFromDb(courseId);
  console.log(result);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Faculties are retrived succesfully',
    data: result,
  });
});

const deleteCourseWithFaculty = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  console.log('culty=-----------------', faculties);
  const result = await courseServices.deleteFacultyFromCourseFromDb(
    courseId,
    faculties,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Faculties deleted from course succesfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignCourseWithFaculty,
  deleteCourseWithFaculty,
  getCourseWithFaculty,
};
