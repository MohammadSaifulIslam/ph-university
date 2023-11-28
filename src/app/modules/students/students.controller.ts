import { NextFunction, Request, Response } from 'express';
import { studentServices } from './students.services';

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // will call service function
    const result = await studentServices.getAllStudentFromDb();
    // will send response data
    res.status(200).json({
      status: true,
      message: 'Student data is retrived successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    // will call service function
    const result = await studentServices.getSingleStudentFromDb(id as string);
    // will send response data
    res.status(200).json({
      status: true,
      message: 'Student data created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
export const studentControllers = {
  getAllStudent,
  getSingleStudent,
};
