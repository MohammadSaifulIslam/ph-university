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

export const offeredCourseControllers = {
  createOfferedCourse,
  updateOfferedCourse,
};
