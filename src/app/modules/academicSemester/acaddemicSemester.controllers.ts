import catchAsync from '../../utils/catchAsync';
import { academicSemesterServices } from './academicSemester.services';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDb(
    req.body,
  );
  res.status(200).json({
    status: true,
    message: 'Student data created successfully',
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
};
