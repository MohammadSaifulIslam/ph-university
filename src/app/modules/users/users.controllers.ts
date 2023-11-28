/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userServices } from './users.services';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  console.log('api hit');
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
