import catchAsync from '../../utils/catchAsync';
import { academicFacultyServices } from './academicFaculty.services';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDb(
    req.body,
  );
  res.status(200).json({
    status: true,
    message: 'Academic Faculty is created successfully',
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultyFromDb(
    req.query,
  );
  res.status(200).json({
    status: true,
    message: 'Academic Faculty is retrived successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await academicFacultyServices.getSingleAcademicFacultyFromDb(id);
  res.status(200).json({
    status: true,
    message: 'Single Academic Faculty is retrived successfully',
    data: result,
  });
});
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicFacultyServices.updateAcademicFacultyIntoDB(
    id,
    req.body,
  );

  res.status(200).json({
    status: true,
    message: 'Academic Faculty is updated successfully',
    data: result,
  });
});

export const academicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
