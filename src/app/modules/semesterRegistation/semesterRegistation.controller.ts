import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { semesterRegistationServices } from './semesterRegistation.service';

const createSemesterRegistation = catchAsync(async (req, res) => {
  const result =
    await semesterRegistationServices.createSemesterRegistationIntoDb(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Semester Registation is created succesfully',
    data: result,
  });
});
const getAllSemesterRegistation = catchAsync(async (req, res) => {
  const query = req.query;
  const result =
    await semesterRegistationServices.getAllSemesterRegistationFromDB(query);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Semester Registations is retrieved succesfully',
    data: result,
  });
});
const getSingleSemesterRegistation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistationServices.getSingleSemesterRegistationFromDB(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Semester Registations is retrieved succesfully',
    data: result,
  });
});

export const semesterRegistationControllers = {
  createSemesterRegistation,
  getAllSemesterRegistation,
  getSingleSemesterRegistation,
};
