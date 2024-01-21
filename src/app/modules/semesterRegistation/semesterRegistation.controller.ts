import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { semesterRegistrationServices } from './semesterRegistation.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.createSemesterRegistrationIntoDb(
      req.body,
    );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Semester Registration is created succesfully',
    data: result,
  });
});
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const query = req.query;
  const result =
    await semesterRegistrationServices.getAllSemesterRegistrationFromDB(query);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Semester Registrations is retrieved succesfully',
    data: result,
  });
});
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Semester Registrations is retrieved succesfully',
    data: result,
  });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationServices.updateSemesterRegistrationIntoDb(
      id,
      req.body,
    );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Semester Registrations is retrieved succesfully',
    data: result,
  });
});

export const semesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
