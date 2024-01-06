import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { offeredCouresServices } from './offeredCourse.service';

const createOfferedCoures = catchAsync(async (req, res) => {
  const result = await offeredCouresServices.createOfferedCourseIntoDb(
    req.body,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Offered Course is created succesfully',
    data: result,
  });
});

export const offeredCourseControllers = {
  createOfferedCoures,
};
