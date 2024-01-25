/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import catchAsync from '../../utils/catchAsync';
import { userServices } from './users.services';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  console.log('hit-------------');
  const result = await userServices.createStudentIntoDB(
    req.file,
    password,
    studentData,
  );
  // will send response data
  res.status(200).json({
    status: true,
    message: 'Student data created successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userServices.createFacultyIntoDB(
    req.file,
    password,
    facultyData,
  );

  res.status(200).json({
    status: true,
    message: 'Faculty data created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userServices.createAdminIntoDB(
    req.file,
    password,
    adminData,
  );
  res.status(200).json({
    status: true,
    message: 'Admin data created successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;

  const result = await userServices.getMe(userId, role);

  res.status(200).json({
    status: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await userServices.changeStatus(id, req.body);

  res.status(200).json({
    status: true,
    message: 'Status is updated succesfully',
    data: result,
  });
});

export const usersControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
