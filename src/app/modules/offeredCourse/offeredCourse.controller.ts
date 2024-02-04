import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { offeredCouresServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCouresServices.createOfferedCourseIntoDb(
    req.body,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Offered Course is created succesfully',
    data: result,
  });
});

const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCouresServices.getAllOfferedCoursesFromDB(
    req.query,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Offered Courses are retrived succesfully',
    data: result,
  });
});
const getMyOfferedCourse = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await offeredCouresServices.getMyOfferedCoursesFromDb(
    userId,
    req.query,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Offered Courses are retrived succesfully',
    data: result,
  });
});

const getSingaleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCouresServices.getSingleOfferedCourseFromDb(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Offered Course is retrived succesfully',
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCouresServices.updateOfferedCourseFromDB(
    id,
    req.body,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Offered Course is updated succesfully',
    data: result,
  });
});

const deleteOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCouresServices.deleteOfferedCourseFromDB(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Offered Course is deleted succesfully',
    data: result,
  });
});

export const offeredCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourse,
  getMyOfferedCourse,
  getSingaleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
};
