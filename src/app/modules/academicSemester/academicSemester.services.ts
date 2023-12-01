import {
  TAcademicSemester,
  TAcademicSemesterCode,
} from './academicSemester.interface';
import AcademicSemester from './academicSemester.models';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  const academicSemesterMapper: TAcademicSemesterCode = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };

  if (academicSemesterMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDb = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const getSingleAcademicSemesterFromDb = async (id: string) => {
  const result = await AcademicSemester.findOne({ _id: id });
  return result;
};
export const academicSemesterServices = {
  createAcademicSemesterIntoDb,
  getAllAcademicSemesterFromDb,
  getSingleAcademicSemesterFromDb,
};
