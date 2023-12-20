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
  const result = await courseServices.getAllCourseFromDb();

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Faculties are retrieved succesfully',
    data: result,
  });
});

// const updateCourse = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const { Course } = req.body;
//   const result = await courseServices.d(id, Course);

//   res.status(httpStatus.OK).json({
//     success: true,
//     message: 'Course is updated succesfully',
//     data: result,
//   });
// });

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.deleteCourseFromDb(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course is deleted succesfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
};
