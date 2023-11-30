/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentServices } from './students.services';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const getAllStudent = catchAsync(async (req, res, next) => {
  // will call service function
  const result = await studentServices.getAllStudentFromDb();
  // will send response data
  res.status(200).json({
    status: true,
    message: 'Student data is retrived successfully',
    data: result,
  });
});
const getSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // will call service function
  const result = await studentServices.getSingleStudentFromDb(id as string);
  // will send response data
  res.status(200).json({
    status: true,
    message: 'Student data created successfully',
    data: result,
  });
});
export const studentControllers = {
  getAllStudent,
  getSingleStudent,
};
