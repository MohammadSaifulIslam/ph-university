import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.models';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDb,
};
