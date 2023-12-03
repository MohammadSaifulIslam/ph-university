import catchAsync from '../../utils/catchAsync';
import { academicDepartmentServices } from './academicDepartment.services';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.createAcademicDepartmentIntoDb(req.body);
  res.status(200).json({
    status: true,
    message: 'Academic Department created successfully',
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.getAllAcademicDepartmentFromDb();
  res.status(200).json({
    status: true,
    message: 'Academic Department retrived successfully',
    data: result,
  });
});
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await academicDepartmentServices.getSingleAcademicDepartmentFromDb(id);
  res.status(200).json({
    status: true,
    message: 'Single Academic Department retrived successfully',
    data: result,
  });
});
const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await academicDepartmentServices.updateAcademicDepartmentIntoDB(
      id,
      req.body,
    );

  res.status(200).json({
    status: true,
    message: 'Academic Department updated successfully',
    data: result,
  });
});

export const academicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
