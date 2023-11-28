import { NextFunction, Request, Response } from 'express';
import { userServices } from './users.services';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

export const usersControllers = {
  createStudent,
};
