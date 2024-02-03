import catchAsync from '../../utils/catchAsync';
import { academicSemesterServices } from './academicSemester.services';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDb(
    req.body,
  );
  res.status(200).json({
    status: true,
    message: 'Academic Semester created successfully',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAllAcademicSemesterFromDb(
    req.query,
  );

  res.status(200).json({
    status: true,
    message: 'Academic Semester retrived successfully',
    data: result,
  });
});
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await academicSemesterServices.getSingleAcademicSemesterFromDb(id);
  res.status(200).json({
    status: true,
    message: 'Single Academic Semester retrived successfully',
    data: result,
  });
});
const updateAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicSemesterServices.updateAcademicSemesterIntoDB(
    id,
    req.body,
  );

  res.status(200).json({
    status: true,
    message: 'Academic Semester updated successfully',
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
