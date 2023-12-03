/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import catchAsync from '../../utils/catchAsync';
import { userServices } from './users.services';

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  // will call service function
  const result = await userServices.createStudentIntoDb(password, student);
  // will send response data
  res.status(200).json({
    status: true,
    message: 'Student data created successfully',
    data: result,
  });
});

export const usersControllers = {
  createStudent,
};
