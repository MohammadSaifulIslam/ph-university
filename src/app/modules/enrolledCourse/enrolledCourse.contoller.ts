import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { EnrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Student is enrolled succesfully',
    data: result,
  });
});
const getAllEnrolledCourses = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;
  const result = await EnrolledCourseServices.getAllEnrolledCoursesFromDb(
    facultyId,
    req.query,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Enrolled courses is retrived succesfully',
    meta: result?.meta,
    data: result?.result,
  });
});
const getMyEnrolledCourses = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EnrolledCourseServices.getMyEnrolledCoursesFromDb(
    userId,
    req.query,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Enrolled courses is retrived succesfully',
    meta: result?.meta,
    data: result?.result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;
  const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
    facultyId,
    req.body,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Marks is updated succesfully',
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  getMyEnrolledCourses,
  updateEnrolledCourseMarks,
  getAllEnrolledCourses,
};
